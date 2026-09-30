(function () {
  function triggerInputEvents(element) {
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }

  function getSelectedInputForRow(row, score) {
    const directMatch = row.querySelector(
      `input[type="radio"][value$="-${score}"]`
    );
    if (directMatch) return directMatch;
    const scoreCell = Array.from(row.querySelectorAll('td[data-th]')).find((td) => {
      const text = (td.getAttribute('data-th') || '').trim();
      return text.startsWith(String(score));
    });

    return scoreCell ? scoreCell.querySelector('input[type="radio"]') : null;
  }

  function fillTeacherEvaluation(score) {
    const normalized = Number(score);
    if (!Number.isInteger(normalized) || normalized < 1 || normalized > 7) {
      throw new Error('Score must be an integer from 1 to 7.');
    }

    const questionRows = Array.from(document.querySelectorAll('tr')).filter((row) =>
      row.querySelector('td[data-num]')
    );

    let filled = 0;
    let skipped = 0;

    questionRows.forEach((row) => {
      const input = getSelectedInputForRow(row, normalized);
      if (!input) {
        skipped += 1;
        return;
      }

      input.checked = true;
      triggerInputEvents(input);
      filled += 1;
    });

    console.log(`Done. Filled ${filled} row(s), skipped ${skipped} row(s).`);
    return { score: normalized, filled, skipped };
  }

  function promptForScore() {
    let value = prompt('Enter a grade from 1 to 7:');

    while (value !== null) {
      const score = Number(value.trim());
      if (Number.isInteger(score) && score >= 1 && score <= 7) {
        fillTeacherEvaluation(score);
        return;
      }

      alert('Incorrect value, input only from 1 to 7. Try again');
      value = prompt('Enter a grade from 1 to 7:');
    }
  }

  window.fillTeacherEvaluation = fillTeacherEvaluation;

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'g') {
      event.preventDefault();
      promptForScore();
      return;
    }

    if (event.target.matches('input, textarea, select, [contenteditable="true"]')) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      return;
    }

    event.preventDefault();

    const score = Number(event.key);
    if (score < 1 || score > 7) {
      alert('Incorrect value, input only from 1 to 7. Try again');
      return;
    }

    fillTeacherEvaluation(score);
  });

  console.log(
    'Script loaded. Enter a grade in the prompt, or press a number from 1 to 7 on the page. If you want to refresh your grade just press ctrl + shift + g and enter a new grade in the prompt.'
  );

  promptForScore();
})();