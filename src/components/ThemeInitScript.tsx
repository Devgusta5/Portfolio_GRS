export function ThemeInitScript() {
  const code = `
    (function () {
      try {
        var saved = window.localStorage.getItem('grs-portfolio-theme');
        if (saved && saved !== 'dark') {
          document.documentElement.dataset.theme = saved;
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
