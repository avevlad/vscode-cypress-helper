let codeLines = [
  `  it("It name", function () {`,
  'sadsd',
  'g56546',
  '  })',
  `  it.only("It name", function () {`,
  '    cy.dwwweewit()',
  '321',
  '  })'
]

const regexIt = / it\(/g
const regexItWithOnly = / it.only\(/g

for (let index = 0; index < codeLines.length; index++) {
  const element = codeLines[index]
  let res = element

  if (element.match(regexIt)) {
    res = element.replace(regexIt, ' it.only(')
  }
  if (element.match(regexItWithOnly)) {
    res = element.replace(regexItWithOnly, ' it(')
  }

  console.log('res:', res)
}

for (let index = 10; index--; ) {
  console.log('index:', index)
}
