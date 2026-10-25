# Overture — Agência Criativa

Site da Overture em React + Vite, com componentes do [React Bits](https://reactbits.dev) (`src/rb`), Motion (parallax por scroll), GSAP e Lenis (rolagem suave).

## Rodar
```
npm install
npm run dev      # desenvolvimento
npm run build    # produção -> dist/
```

## Editar conteúdo
Textos, links e contatos ficam em `src/data.js` (WhatsApp, Discord, serviços, projetos, segmentos, etapas e números).
Imagens dos projetos ficam em `public/work/` (hoje são recortes do reel; troque por prints em alta).
O reel fica em `public/reel.mp4`.

## Cursor quadrado
Qualquer elemento com a classe `cursor-target` ganha o cursor de cantos (TargetCursor) no hover.

## Deploy
Cada push na branch `main` publica automaticamente na Vercel.
