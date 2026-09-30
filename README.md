# NUL OTE Auto-Fill Script

This project contains a browser-side JavaScript utility that fills all rating rows in an online teacher evaluation table with one score.
The script is in `scraper-javascript.js` and is designed to run in the browser DevTools Console (not with `node`).

## What the script does?

1. Validates your input score (`1` to `7`).
2. Finds question rows by looking for `<tr>` elements that contain `td[data-num]`.
3. For each row, finds the radio input for the selected score.
4. Sets that input as checked.
5. Dispatches `input`, `change`, and `click` events so the page properly registers the selection.
6. Prints a summary in the console (`filled` vs `skipped`).


### `getSelectedInputForRow(row, score)`

Finds the correct radio input for one table row:
- Primary lookup: `input[type="radio"][value$="-${score}"]`
- Fallback lookup: checks `td[data-th]` labels and then gets the radio inside that cell

## How to use

1. Open OTE page in NUIS
2. Open browser DevTools Console (CTRL + SHIFT + J) / F12 > Console tab
3. Paste all code from `scraper-javascript.js` and press Enter.
4. Input 'allow pasting' if there is an error prompted about pasting
5. Type a number from `1` to `7` on the evaluation page to fill every row with that score.
	If the number is outside that range, the script displays: `Incorrect value, input only from 1 to 7. Try again`

You can also run the function directly:

```js
fillTeacherEvaluation(7)
```
