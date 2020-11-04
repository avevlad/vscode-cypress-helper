import * as vscode from 'vscode'

let regexIt = / it\(/g
let regexItWithOnly = / it.only\(/g
let values = {
  it: ' it(',
  itWithOnly: ' it.only('
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'vscode-cypress-helper.helloWorld',
    () => {
      let editor = vscode.window.activeTextEditor
      if (!editor) {
        return
      }

      let { selection, document } = editor
      let replaceLine: number | null = null
      let replaceValue: string = ''

      for (let i = selection.active.line + 1; i--; ) {
        const { text } = document.lineAt(i)
        if (text.match(regexIt) || text.match(regexItWithOnly)) {
          replaceLine = i
          if (text.match(regexIt)) {
            replaceValue = text.replace(regexIt, values.itWithOnly)
          }
          if (text.match(regexItWithOnly)) {
            replaceValue = text.replace(regexItWithOnly, values.it)
          }
          break
        }
      }

      if (!replaceLine) {
        return
      }

      editor.edit((editBuilder) => {
        editBuilder.replace(
          new vscode.Range(
            new vscode.Position(replaceLine as number, 0),
            new vscode.Position(replaceLine as number, 9999999999)
          ),
          replaceValue
        )
      })
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
