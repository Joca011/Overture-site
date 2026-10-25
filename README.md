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
## Portfólio
Cada projeto é uma entrada em `WORKS` (`src/data.js`) com duas imagens em `public/work/`:
`<slug>.webp` (1600px, usada na visualização ampliada) e `<slug>-sm.webp` (720px, usada na parede animada e na grade).
Para adicionar um projeto, gere as duas imagens em WebP, coloque em `public/work/` e acrescente a entrada em `WORKS`.

## Deploy
Cada push na branch `main` publica automaticamente na Vercel.
