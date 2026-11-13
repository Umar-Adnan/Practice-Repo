// Frontend functionality for command search and API checking

document.addEventListener('DOMContentLoaded', () => {
  // Command filtering
  const searchInput = document.getElementById('command-search');
  const commandList = document.getElementById('command-list');
  const items = commandList.getElementsByTagName('li');

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    Array.from(items).forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'flex' : 'none';
    });
  });

  // Copy to clipboard
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.closest('li').getAttribute('data-cmd');
      navigator.clipboard.writeText(cmd).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      });
    });
  });

  // Check Backend API
  const checkBtn = document.getElementById('check-api-btn');
  const outputBox = document.getElementById('api-output');

  checkBtn.addEventListener('click', async () => {
    outputBox.textContent = 'Pinging http://localhost:3000/api/status...';
    try {
      const res = await fetch('http://localhost:3000/api/status');
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      outputBox.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      outputBox.textContent = `Could not reach backend server: ${err.message}\nMake sure to run 'node Backend/server.js' locally.`;
    }
  });
});
