// ─────────────────────────────────────────────
// Camada nativa (só roda dentro do app Capacitor).
// O PSIQUE.html emite eventos semânticos; aqui eles viram
// comportamento de plataforma: háptica e status bar.
// No site (web), este arquivo nem é incluído.
// ─────────────────────────────────────────────
(function () {
  const cap = window.Capacitor;
  if (!cap || !cap.isNativePlatform || !cap.isNativePlatform()) return;

  const { Haptics, StatusBar } = cap.Plugins;

  // Status bar cor de papel com ícones escuros
  if (StatusBar) {
    StatusBar.setStyle({ style: 'LIGHT' }).catch(() => {});
    if (cap.getPlatform() === 'android') {
      StatusBar.setBackgroundColor({ color: '#f4efe6' }).catch(() => {});
    }
  }

  if (Haptics) {
    // Rearranjo de funções (troca de slot durante o arrasto): toque leve
    document.addEventListener('psique:rearrange', () => {
      Haptics.impact({ style: 'LIGHT' }).catch(() => {});
    });
    // Sorteio de nova disposição: toque médio
    document.addEventListener('psique:shuffle', () => {
      Haptics.impact({ style: 'MEDIUM' }).catch(() => {});
    });
  }
})();
