import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const BASE = 'http://127.0.0.1:43123'
const OUT = '/opt/cursor/artifacts/screenshots'
const results = []

function record(name, pass, detail) {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name} — ${detail}`)
}

async function advanceToStep3(page) {
  await page.goto(`${BASE}/suryapet/kodad/survey`, { waitUntil: 'networkidle' })

  // Step 1
  await page.getByPlaceholder('పేరు రాయండి').fill('Test User')
  await page.locator('input[placeholder="9876543210"]').fill('9876543210')
  await page.getByRole('button', { name: 'నయి / మంగలి' }).click()
  await page.getByRole('button', { name: /తదుపరి/ }).click()

  // Step 2
  await page.waitForSelector('text=పౌర & స్థానం')
  await page.locator('select').selectOption({ index: 1 })
  await page.getByRole('button', { name: /తదుపరి/ }).click()

  // Step 3
  await page.waitForSelector('text=కుటుంబ సభ్యులు')
  await page.getByPlaceholder('పేరు').first().fill('Member One')
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 420, height: 920 } })

  // ——— TEST B first while on step 3, then continue to step 4 ———
  await advanceToStep3(page)

  const memberCardsBefore = await page.locator('li').filter({ has: page.locator('text=/^0\\d$/') }).count()
  // Count by mono step markers inside roster
  const rowsBefore = await page.locator('ul.space-y-4 > li').count()
  const totalBeforeText = await page.locator('text=మొత్తం సభ్యులు').locator('..').locator('.font-mono').innerText()

  await page.getByRole('button', { name: /కుటుంబ సభ్యుడిని చేర్చండి/ }).click()
  await page.waitForTimeout(200)
  const rowsAfter1 = await page.locator('ul.space-y-4 > li').count()
  const totalAfter1 = await page.locator('text=మొత్తం సభ్యులు').locator('..').locator('.font-mono').innerText()
  const has02 = await page.locator('text=02').first().isVisible()

  await page.getByRole('button', { name: /కుటుంబ సభ్యుడిని చేర్చండి/ }).click()
  await page.waitForTimeout(200)
  const rowsAfter2 = await page.locator('ul.space-y-4 > li').count()
  const has03 = await page.locator('text=03').first().isVisible()

  // Layout sanity: each roster card should have positive box and no overflow outside card
  const boxes = await page.locator('ul.space-y-4 > li').evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      return {
        w: r.width,
        h: r.height,
        top: r.top,
        overflow: style.overflow,
      }
    }),
  )
  const layoutOk =
    boxes.length === 3 &&
    boxes.every((b) => b.w > 200 && b.h > 80) &&
    boxes[1].top > boxes[0].top + 40 &&
    boxes[2].top > boxes[1].top + 40

  await page.screenshot({
    path: `${OUT}/nayi-survey-roster-add.png`,
    fullPage: true,
  })

  record(
    'Roster + Add Member appends rows',
    rowsBefore === 1 && rowsAfter1 === 2 && rowsAfter2 === 3 && has02 && has03,
    `rows ${rowsBefore}→${rowsAfter1}→${rowsAfter2}; markers 02=${has02} 03=${has03}; counter ${totalBeforeText}→${totalAfter1}`,
  )
  record(
    'Roster layout intact',
    layoutOk,
    `3 stacked cards heights=${boxes.map((b) => Math.round(b.h)).join(',')}`,
  )

  // Fill new members so we can proceed
  const nameInputs = page.getByPlaceholder('పేరు')
  await nameInputs.nth(1).fill('Member Two')
  await nameInputs.nth(2).fill('Member Three')
  await page.getByRole('button', { name: /తదుపరి/ }).click()
  await page.waitForSelector('text=జీవనోపాధి')

  // ——— TEST A: Salon Owner ———
  await page.getByRole('button', { name: 'సెలూన్ యజమాని' }).click()
  await page.waitForTimeout(150)
  const salonBranch = await page.locator('text=శాఖ 4A — సెలూన్').isVisible()
  const premise = await page.getByText('ప్రాంగణ యాజమాన్యం').isVisible()
  const power = await page.getByText('250 యూనిట్ల ఉచిత విద్యుత్ స్థితి').isVisible()
  const usc = await page.getByText(/USC/).isVisible()
  const rented = await page.getByRole('button', { name: 'అద్దె' }).isVisible()
  const bajantriGone = !(await page.locator('text=శాఖ 4B — భజంత్రి').isVisible())
  await page.screenshot({
    path: `${OUT}/nayi-survey-branch-salon.png`,
    fullPage: true,
  })
  record(
    'Salon Owner opens 4A (premise + 250 units + USC)',
    salonBranch && premise && power && usc && rented && bajantriGone,
    `4A=${salonBranch} premise=${premise} power=${power} usc=${usc} rented=${rented} no4B=${bajantriGone}`,
  )

  // ——— Bajantri ———
  await page.getByRole('button', { name: 'భజంత్రి సంగీతకారుడు' }).click()
  await page.waitForTimeout(150)
  const bajBranch = await page.locator('text=శాఖ 4B — భజంత్రి').isVisible()
  const temple = await page.getByRole('button', { name: 'దేవాలయ ఒప్పందం' }).isVisible()
  const cultural = await page.getByText('సాంస్కృతిక శాఖ ID').isVisible()
  const pension = await page.getByText('పెన్షన్ స్థితి').isVisible()
  const salonGone = !(await page.locator('text=శాఖ 4A — సెలూన్').isVisible())
  await page.screenshot({
    path: `${OUT}/nayi-survey-branch-bajantri.png`,
    fullPage: true,
  })
  record(
    'Bajantri opens 4B (temple + cultural ID + pension)',
    bajBranch && temple && cultural && pension && salonGone,
    `4B=${bajBranch} temple=${temple} cultural=${cultural} pension=${pension} no4A=${salonGone}`,
  )

  // ——— Student skip to Step 5 ———
  await page.getByRole('button', { name: 'విద్యార్థి' }).click()
  await page.waitForTimeout(150)
  const skipMsg = await page.getByText(/అదనపు వివరాలు అవసరం లేదు/).isVisible()
  const noTrade =
    !(await page.locator('text=శాఖ 4A').isVisible()) &&
    !(await page.locator('text=శాఖ 4B').isVisible())
  await page.getByRole('button', { name: /తదుపరి/ }).click()
  await page.waitForSelector('text=సంక్షేమం & ఆకాంక్షలు')
  const stepPill = await page.locator('text=Step 5 of 6').isVisible()
  const onStep5 = await page.getByText('సంక్షేమం & ఆకాంక్షలు').isVisible()
  await page.screenshot({
    path: `${OUT}/nayi-survey-branch-student-step5.png`,
    fullPage: true,
  })
  record(
    'Student bypasses trade fields → Step 5',
    skipMsg && noTrade && stepPill && onStep5,
    `skipMsg=${skipMsg} noTrade=${noTrade} stepPill=${stepPill} onStep5=${onStep5}`,
  )

  await browser.close()

  const failed = results.filter((r) => !r.pass)
  console.log('\n--- SUMMARY ---')
  console.log(`Passed ${results.length - failed.length}/${results.length}`)
  if (failed.length) {
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
