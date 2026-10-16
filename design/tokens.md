# Tokens do layout (Figma) – Kurio

## Resumo dos tokens
- Fonte: Roboto Mono
- Fundo (color/ink): #140D0A
- Texto (color/foreground): #F5F1EB
- Primária (color/primary): #D28A4C
- Destaque (text/accent): #E89B55
- Texto secundário (text/secondary): #CFB28C
- Raio de botões: 6px | Imagem do hero: 24px

---


# Desktop / Início
## Início – Top (header + hero)
/* Top */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 527px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header With Divider

Header Row plus the hairline divider beneath it. Used on the five sites that already show the divider: the home, collector profile and wallets screens, and inside Marketplace Page, which the two auth screens instance. Market screens intentionally use a bare Header Row with no divider.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 58px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Active Underline */

width: 58px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 1 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Hero */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 0px 0px 40px;
isolation: isolate;

width: 1200px;
height: 450px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 3 */

position: absolute;
width: 1200px;
height: 450px;
left: 0px;
top: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Frame 137 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 110px;

width: 1160px;
height: 450px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Frame 135 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 44px;

width: 600px;
height: 364px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 134 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 600px;
height: 312px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 133 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 600px;
height: 240px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 132 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 600px;
height: 164px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Bem-vindo à Kurio */

width: 600px;
height: 16px;

/* Body/14 Medium · lh 16

combo:14|Medium|16px|10% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* OWN THE FUTURE OF
DIGITAL ART */

width: 600px;
height: 140px;

/* Display/43 Bold

combo:43|Bold|70px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 70px;
/* or 163% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Discover curated NFTs from emerging and established creators. Collect rare digit */

width: 557px;
height: 72px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 131 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 36px 10px 28px;
gap: 10px;

width: 140px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* EXPLORAR */

width: 77px;
height: 20px;

/* Body Large/16 Bold · lh 20

combo:16|Bold|20px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Group 4 */

width: 40px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 2 */

position: absolute;
width: 8px;
height: 8px;
left: 576px;
top: 356px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Ellipse 3 */

position: absolute;
width: 8px;
height: 8px;
left: 592px;
top: 356px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Ellipse 4 */

position: absolute;
width: 8px;
height: 8px;
left: 560px;
top: 356px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Frame 136 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 280px 290px 50px 40px;
gap: 10px;

width: 450px;
height: 450px;

background: url(.png);
border-radius: 24px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

## Início – Products (filtros + cards)

/* Products */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 48px;

width: 1200px;
height: 1373px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Sidebar */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 310px;
height: 1279px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Filters

Marketplace sidebar filter panel, 310 wide: collection checkboxes with counts, price range with Apply, and network checkboxes. Fixed 310 width — the host column owns the placement. Content is identical on every screen; no per-instance overrides expected.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;

width: 310px;
height: 785px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 140 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 270px;
height: 745px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Collections Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Coleções */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* List */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 12px;

width: 270px;
height: 360px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 382 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 373 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 109px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships */

width: 109px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (33) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 383 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 374 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 91px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 91px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (12) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 384 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 375 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 55px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 55px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (65) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 385 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 376 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 64px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 64px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (39) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 390 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 377 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 118px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (23) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 389 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 378 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 91px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 91px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (17) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 388 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Frame 379 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 46px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 46px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (19) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 387 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Frame 380 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 100px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 100px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (13) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 386 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Frame 381 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 82px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 82px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (18) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Price Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 129px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Faixa de preço */

width: 152px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Controls */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 12px;
gap: 12px;

width: 270px;
height: 101px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Slider */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
isolation: isolate;

width: 258px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Ellipse 5 */

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 3px solid #140D0A;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 3;


/* Line 6 */

width: 161px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 4px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 2;


/* Ellipse 6 */

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 3px solid #140D0A;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 1;


/* Line 5 */

width: 55px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 4px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;
z-index: 0;


/* Frame 391 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 258px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Preço: 0,02 - 12,30 ETH */

width: 208px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Apply Button */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 12px;

width: 92px;
height: 36px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aplicar */

width: 68px;
height: 20px;

/* Body Large/16 Bold · lh 20

combo:16|Bold|20px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Network Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 148px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Rede */

width: 44px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* List */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 12px;

width: 270px;
height: 120px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 392 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 73px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (119) */

margin: 0 auto;
width: 46px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 393 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 64px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (78) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 394 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 55px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (86) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Featured NFT Banner */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 24px 0px 4px;
gap: 10px;
isolation: isolate;

width: 310px;
height: 470px;

background: linear-gradient(180deg, rgba(210, 138, 76, 0.1) 0%, rgba(210, 138, 76, 0.03) 100%);

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 396 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 310px;
height: 448px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Frame 395 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 16px;

width: 310px;
height: 64px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 397 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 20px;
gap: 10px;

width: 310px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT EM DESTAQUE */

width: 270px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 32px;
/* identical to box height, or 133% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 398 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 20px;
gap: 10px;

width: 310px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* OFERTA LIMITADA */

width: 270px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 16px;
/* identical to box height, or 73% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* NFT Artwork 18 */

width: 310px;
height: 368px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 22px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Rectangle 30 */

box-sizing: border-box;

position: absolute;
width: 22px;
height: 22px;
left: 16px;
top: 299px;

opacity: 0.2;
border-radius: 7px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Rectangle 31 */

position: absolute;
width: 45px;
height: 45px;
left: 248px;
top: 343px;

background: linear-gradient(145.46deg, rgba(210, 138, 76, 0.3) -46.09%, rgba(210, 138, 76, 0) 103.28%);
border-radius: 29px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Rectangle 32 */

position: absolute;
width: 15px;
height: 15px;
left: 38px;
top: 105px;

background: linear-gradient(145.46deg, rgba(210, 138, 76, 0.3) -46.09%, rgba(210, 138, 76, 0) 103.28%);
border-radius: 29px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 3;


/* Product Grid */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 88px;

width: 842px;
height: 1373px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Frame 233 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 842px;
height: 1250px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Toolbar */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
isolation: isolate;

width: 842px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Tabs */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 376px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Todos os NFTs */

width: 118px;
height: 16px;

/* Body/15 Medium

combo:15|Medium|16px|0% | usos: 6
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Novos lançamentos */

width: 154px;
height: 16px;

/* Body/15 Medium

combo:15|Medium|16px|0% | usos: 6
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Em alta */

width: 64px;
height: 16px;

/* Body/15 Medium

combo:15|Medium|16px|0% | usos: 6
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Sort */

width: 300px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Ordenar por: */

position: absolute;
width: 109px;
height: 20px;
left: 0px;
top: 0px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Listados recentemente */

position: absolute;
width: 190px;
height: 20px;
left: 110px;
top: 0px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Iconly/Two-tone/Arrow - Down 2 */

position: absolute;
width: 16px;
height: 16px;
left: 278px;
top: 2px;



/* Iconly/Two-tone/Arrow - Down 2 */

position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;



/* Arrow - Down 2 */

position: absolute;
width: 9.33px;
height: 4.67px;
left: 3.33px;
top: 5.67px;



/* Stroke 1 */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 35.42%;
bottom: 35.42%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
border: 1.5px solid #F5F1EB;


/* Line 3 */

position: absolute;
width: 101px;
height: 0px;
left: 0px;
top: 23px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Grid Rows */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 72px;

width: 842px;
height: 1200px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 206 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 32px;

width: 842px;
height: 356px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 141 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 258px;
height: 356px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rectangle 6 */

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Emerald Ape #042 */

width: 258px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* 1.19 ETH */

width: 258px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* NFT Artwork 03 */

position: absolute;
width: 250px;
height: 250px;
left: 4px;
top: 31px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 3;


/* Frame 142 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 258px;
height: 356px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 7 */

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Sage Nomad #009 */

width: 258px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* 1.69 ETH */

width: 258px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* NFT Artwork 04 */

position: absolute;
width: 250px;
height: 250px;
left: 4px;
top: 25px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 3;


/* Frame 144 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 258px;
height: 356px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Rectangle 8 */

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Neon Vessel #552 */

width: 258px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Frame 143 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 186px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* 1.99 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 2.29 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* NFT Artwork 05 */

position: absolute;
width: 250px;
height: 250px;
left: 4px;
top: 24px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 3;


/* Frame 230 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 32px;

width: 842px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 209 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 258px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 207 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 12px 8px 20px;
gap: 10px;

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Artwork 06 */

width: 224px;
height: 286px;

background: url(.png);
border-radius: 13px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 208 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cosmic Bloom #118 */

width: 164px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 1.29 ETH */

width: 164px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 212 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 258px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 211 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 24px 4px 28px;
gap: 10px;

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Artwork 07 */

width: 250px;
height: 250px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 210 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 164px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 1.39 ETH */

width: 164px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 215 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 258px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame 214 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 24px 4px 28px;
gap: 10px;

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Artwork 08 */

width: 250px;
height: 250px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 213 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 154px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 1.79 ETH */

width: 154px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 231 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 842px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 218 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 258px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 216 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 4px 32px;
gap: 10px;

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Artwork 09 */

width: 250px;
height: 250px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 217 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Golden Beat #207 */

width: 154px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 0.99 ETH */

width: 154px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 220 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 28px 4px 24px;
gap: 10px;

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* NFT Artwork 10 */

width: 250px;
height: 250px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 223 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 258px;
height: 350px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame 221 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 4px 32px;
gap: 10px;

width: 258px;
height: 300px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Artwork 11 */

width: 250px;
height: 250px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 222 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 173px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Golden Signal #160 */

width: 173px;
height: 16px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 0.39 ETH */

width: 173px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Pagination */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 224 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 35px;
height: 35px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 1 */

width: 11px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 225 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 8px 12px 10px;
gap: 10px;

width: 35px;
height: 35px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* 2 */

width: 11px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 226 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 8px 12px 10px;
gap: 10px;

width: 35px;
height: 35px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* 3 */

width: 11px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 227 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 8px 12px 10px;
gap: 10px;

width: 35px;
height: 35px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* 4 */

width: 11px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 228 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px;
gap: 10px;

width: 35px;
height: 35px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Iconly/Curved/Arrow - Right 2 */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow - Right 2 */

position: absolute;
width: 10.5px;
height: 5.25px;
left: 6.38px;
top: 3.75px;

transform: rotate(-90deg);


/* Stroke 1 */

position: absolute;
left: 35.42%;
right: 6.25%;
top: 20.83%;
bottom: 50%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
border: 1.5px solid #F5F1EB;
transform: rotate(-90deg);


## Início – Promos
/* Promos */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 28px;

width: 1200px;
height: 250px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Promo Card — Genesis Drops */

width: 586px;
height: 250px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rectangle 22 */

position: absolute;
width: 586px;
height: 250px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Limited-edition
genesis drops */

position: absolute;
width: 206px;
height: 48px;
left: 350px;
top: 37px;

/* Body Large/18 Bold · lh 24

combo:18|Bold|24px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 24px;
/* or 133% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;



/* Colecione edições escassas diretamente dos criadores antes da revelação pública. */

position: absolute;
width: 263px;
height: 45px;
left: 293px;
top: 94px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;



/* NFT Artwork 17 */

position: absolute;
width: 292px;
height: 250px;
left: -5px;
top: 0px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 18px;


/* Group 16 */

position: absolute;
width: 140px;
height: 40px;
left: 416px;
top: 164px;



/* Rectangle 23 */

position: absolute;
width: 140px;
height: 40px;
left: 416px;
top: 164px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Group 14 */

position: absolute;
width: 86px;
height: 20px;
left: 442px;
top: 174px;



/* Frame 15 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
padding: 0px;

position: absolute;
width: 86px;
height: 20px;
left: 442px;
top: 174px;



/* Explorar */

width: 68px;
height: 20px;

/* Body/14 Medium · lh 20

combo:14|Medium|20px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Arrow - Right */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Arrow - Right */

position: absolute;
width: 9.04px;
height: 11.25px;
left: 3.56px;
top: 4.28px;

transform: rotate(-90deg);


/* Stroke 1 */

position: absolute;
left: 19.79%;
right: 76.04%;
top: 46.77%;
bottom: -9.27%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: rotate(-90deg);


/* Stroke 3 */

position: absolute;
left: 57.08%;
right: -7.29%;
top: 23.76%;
bottom: 51.04%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: rotate(-90deg);


/* Mask Group */

position: absolute;
width: 586px;
height: 250px;
left: 0px;
top: 0px;



/* Rectangle 22 */

position: absolute;
width: 586px;
height: 250px;
left: 0px;
top: 0px;

/* Color/Background Elevated

#FBFBFB — vinculado à variável color/background-elevated
*/
background: #FBFBFB;


/* Ellipse 7 */

box-sizing: border-box;

position: absolute;
width: 256px;
height: 256px;
left: -191px;
top: 142px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;


/* Ellipse 8 */

box-sizing: border-box;

position: absolute;
width: 256px;
height: 256px;
left: -199px;
top: 134px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;


/* Promo Card — Curated Art */

width: 586px;
height: 250px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 24 */

position: absolute;
width: 586px;
height: 250px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Curated digital art
& much more */

position: absolute;
width: 260px;
height: 48px;
left: 291px;
top: 37px;

/* Body Large/18 Bold · lh 24

combo:18|Bold|24px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 24px;
/* or 133% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;



/* NFT Artwork 16 */

position: absolute;
width: 287px;
height: 250px;
left: 2px;
top: 0px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 17px;


/* Explore novos artistas, coleções verificadas e obras digitais que definem a cultura. */

position: absolute;
width: 252px;
height: 45px;
left: 295px;
top: 94px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;



/* Group 17 */

position: absolute;
width: 140px;
height: 40px;
left: 411px;
top: 164px;



/* Rectangle 23 */

position: absolute;
width: 140px;
height: 40px;
left: 411px;
top: 164px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Group 15 */

position: absolute;
width: 86px;
height: 20px;
left: 439px;
top: 174px;



/* Frame 15 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
padding: 0px;

position: absolute;
width: 86px;
height: 20px;
left: 439px;
top: 174px;



/* Explorar */

width: 68px;
height: 20px;

/* Body/14 Medium · lh 20

combo:14|Medium|20px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Arrow - Right */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Arrow - Right */

position: absolute;
width: 9.04px;
height: 11.25px;
left: 3.56px;
top: 4.28px;

transform: rotate(-90deg);


/* Stroke 1 */

position: absolute;
left: 19.79%;
right: 76.04%;
top: 46.77%;
bottom: -9.27%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: rotate(-90deg);


/* Stroke 3 */

position: absolute;
left: 57.08%;
right: -7.29%;
top: 23.76%;
bottom: 51.04%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: rotate(-90deg);


/* Mask Group */

position: absolute;
width: 586px;
height: 250px;
left: 0px;
top: 0px;



/* Rectangle 22 */

position: absolute;
width: 586px;
height: 250px;
left: 0px;
top: 0px;

/* Color/Background Elevated

#FBFBFB — vinculado à variável color/background-elevated
*/
background: #FBFBFB;


/* Ellipse 7 */

box-sizing: border-box;

position: absolute;
width: 256px;
height: 256px;
left: -191px;
top: 142px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;


/* Ellipse 8 */

box-sizing: border-box;

position: absolute;
width: 256px;
height: 256px;
left: -199px;
top: 134px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;

## Início – Blog
/* Blog */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 40px;

width: 1200px;
height: 476px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Blog Section Header */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 12px;

width: 1200px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Diário da Cunhagem */

width: 1200px;
height: 37px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 37px;
/* identical to box height */
text-align: center;

color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Histórias, guias e insights para colecionadores sobre o universo da propriedade digital. */

width: 1200px;
height: 18px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 18px;
text-align: center;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cards */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 1200px;
height: 369px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Card 1 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 268px;
height: 369px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Image */

width: 268px;
height: 195px;

background: url(.png);

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 16px 16px;
gap: 8px;

width: 268px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* 12 de setembro | Leitura de 6 min */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Como funciona a propriedade de NFTs */

width: 236px;
height: 42px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Aprenda a colecionar, negociar e verificar ativos digitais. */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* CTA */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 74px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Ler mais */

width: 58px;
height: 14px;

/* Caption/12 Bold

combo:12|Bold|14px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;
/* identical to box height, or 117% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* → */

width: 12px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Card 2 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 268px;
height: 369px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Image */

width: 268px;
height: 195px;

background: url(.png);

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 16px 16px;
gap: 8px;

width: 268px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* 13 de setembro | Leitura de 2 min */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 10 artistas digitais para acompanhar */

width: 236px;
height: 42px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Conheça criadores que moldam a cultura digital. */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* CTA */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 74px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Ler mais */

width: 58px;
height: 14px;

/* Caption/12 Bold

combo:12|Bold|14px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;
/* identical to box height, or 117% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* → */

width: 12px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Card 3 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 268px;
height: 369px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Image */

width: 268px;
height: 195px;

background: url(.png);

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 16px 16px;
gap: 8px;

width: 268px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* 15 de setembro | Leitura de 3 min */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Raridade, atributos e procedência */

width: 236px;
height: 42px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Entenda raridade, procedência, direitos autorais e utilidade. */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* CTA */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 74px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Ler mais */

width: 58px;
height: 14px;

/* Caption/12 Bold

combo:12|Bold|14px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;
/* identical to box height, or 117% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* → */

width: 12px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Card 4 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 268px;
height: 369px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Image */

width: 268px;
height: 195px;

background: url(.png);

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 16px 16px;
gap: 8px;

width: 268px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* 15 de setembro | Leitura de 2 min */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Como proteger sua carteira */

width: 236px;
height: 42px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Proteja sua carteira, seus ativos e sua identidade. */

width: 236px;
height: 32px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* CTA */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 74px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Ler mais */

width: 58px;
height: 14px;

/* Caption/12 Bold

combo:12|Bold|14px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;
/* identical to box height, or 117% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* → */

width: 12px;
height: 16px;

font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

# Desktop / Detalhes do NFT
## Detalhes – Top (galeria + informações + compra)
/* Top */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 32px;

width: 1200px;
height: 553px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 68px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Active Underline */

width: 68px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Main */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 476px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Início / Mercado */

width: 145px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Product */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 448px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Product Images */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;
isolation: isolate;

width: 573px;
height: 448px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rectangle 74 */

position: absolute;
width: 100px;
height: 100px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Rectangle 75 */

position: absolute;
width: 100px;
height: 100px;
left: 0px;
top: 116px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Rectangle 76 */

position: absolute;
width: 100px;
height: 100px;
left: 0px;
top: 232px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Rectangle 77 */

position: absolute;
width: 100px;
height: 100px;
left: 0px;
top: 348px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 3;


/* Thumbnails */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 100px;
height: 448px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* NFT Collection Artwork 04 */

width: 100px;
height: 100px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Collection Artwork 02 */

box-sizing: border-box;

width: 100px;
height: 100px;

background: url(.png);
mix-blend-mode: normal;
/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* NFT Collection Artwork 05 */

width: 100px;
height: 100px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* NFT Collection Artwork 03 */

width: 100px;
height: 100px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Main Image */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 16px;
gap: 10px;

width: 444px;
height: 444px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 5;


/* NFT Collection Artwork 01 */

width: 404px;
height: 404px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 24px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 399 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 30px;
height: 30px;
left: 530px;
top: 15px;


/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 6;


/* Frame 238 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;
isolation: isolate;

width: 30px;
height: 30px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 23 */

box-sizing: border-box;

width: 30px;
height: 30px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Vector */

position: absolute;
width: 20px;
height: 20px;
left: 5px;
top: 5px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Details */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 595px;
height: 448px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* Frame 149 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 595px;
height: 81px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 148 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 595px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Emerald Ape #042 */

width: 595px;
height: 37px;

/* Heading/28 Bold

combo:28|Bold|16px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 37px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 147 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 229px;

width: 595px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* 1.19 ETH */

width: 106px;
height: 16px;

/* Title/22 Bold

combo:22|Bold|16px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 16px;
/* identical to box height, or 73% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 40 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 375px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Bold/Star */

width: 15px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Star */

position: absolute;
width: 12.5px;
height: 11.88px;
left: 1.25px;
top: 1.56px;



/* Star */

position: absolute;
left: 8.33%;
right: 8.32%;
top: 10.42%;
bottom: 10.41%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Iconly/Bold/Star */

width: 15px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Star */

position: absolute;
width: 12.5px;
height: 11.88px;
left: 1.25px;
top: 1.56px;



/* Star */

position: absolute;
left: 8.33%;
right: 8.32%;
top: 10.42%;
bottom: 10.41%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Iconly/Bold/Star */

width: 15px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Star */

position: absolute;
width: 12.5px;
height: 11.88px;
left: 1.25px;
top: 1.56px;



/* Star */

position: absolute;
left: 8.33%;
right: 8.32%;
top: 10.42%;
bottom: 10.41%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Iconly/Bold/Star */

width: 15px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Star */

position: absolute;
width: 12.5px;
height: 11.88px;
left: 1.25px;
top: 1.56px;



/* Star */

position: absolute;
left: 8.33%;
right: 8.32%;
top: 10.42%;
bottom: 10.41%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Iconly/Bold/Star */

width: 15px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Star */

position: absolute;
width: 12.5px;
height: 11.88px;
left: 1.25px;
top: 1.56px;



/* Star */

position: absolute;
left: 8.33%;
right: 8.32%;
top: 10.42%;
bottom: 10.41%;

/* Text/Secondary

#CFB28C — vinculado à variável color/text-secondary
*/
background: #CFB28C;


/* 19 avaliações de colecionadores */

width: 280px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Line 2 */

width: 573px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 150 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 574px;
height: 94px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Sobre este NFT: */

width: 574px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores. */

width: 574px;
height: 66px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 157 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 209px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Edição: */

width: 209px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 156 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 209px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 155 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px 4px;
gap: 10px;
isolation: isolate;

width: 36px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 24 */

box-sizing: border-box;

position: absolute;
width: 36px;
height: 28px;
left: 0px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* 1/1 */

width: 26px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Frame 152 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px 4px;
gap: 10px;
isolation: isolate;

width: 42px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 25 */

box-sizing: border-box;

position: absolute;
width: 42px;
height: 28px;
left: 0px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* 1/10 */

width: 34px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Frame 153 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;
gap: 10px;
isolation: isolate;

width: 46px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Ellipse 26 */

box-sizing: border-box;

position: absolute;
width: 46px;
height: 28px;
left: 0px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* 1/50 */

width: 34px;
height: 16px;

/* Body/14 Medium · lh 16 · ls 0%

combo:14|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Frame 154 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px 8px;
gap: 10px;
isolation: isolate;

width: 66px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Ellipse 27 */

box-sizing: border-box;

position: absolute;
width: 66px;
height: 28px;
left: 0px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* ABERTA */

width: 51px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Frame 167 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 16px;

margin: 0 auto;
width: 595px;
height: 49.5px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* 01 */

margin: 0 auto;
width: 103px;
height: 49.5px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 160 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 20px;

position: absolute;
width: 103px;
height: 49.5px;
left: 0px;
top: 0px;



/* Frame 48 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 103px;
height: 49.5px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 33px;
height: 49.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 6.6px 19.8px -3.3px rgba(20, 13, 10, 0.14902);
border-radius: 33px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame */

width: 26.4px;
height: 26.4px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 45.83%;
bottom: 45.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* 1 */

width: 13px;
height: 28px;

/* Title/20 Regular · lh 10

combo:20|Regular|10px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 28px;
/* identical to box height, or 140% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 33px;
height: 49.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 6.6px 19.8px -3.3px rgba(20, 13, 10, 0.14902);
border-radius: 33px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame */

width: 26.4px;
height: 26.4px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Frame 400 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

margin: 0 auto;
width: 268px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 161 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 10px;

width: 130px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* COMPRAR */

margin: 0 auto;
width: 59px;
height: 20px;

/* Body/14 Bold · lh 20

combo:14|Bold|20px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 162 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 8px;

width: 130px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* heart 1 */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 5.47%;
bottom: 5.56%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Favoritar */

width: 76px;
height: 20px;

/* Body/14 Medium · lh 20

combo:14|Medium|20px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 166 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 308px;
height: 114px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 164 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 308px;
height: 84px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0042 */

width: 308px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Coleção: Kurio Apes */

width: 308px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Atributos: Óculos, Esmeralda, Raro */

width: 308px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 165 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 271.97px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Compartilhar este NFT: */

width: 199px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Linkedin */

width: 15px;
height: 14.38px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Message */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Vector 13 (Stroke) */

position: absolute;
left: 8.33%;
right: 8.33%;
top: 16.67%;
bottom: 16.67%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Twitter */

width: 15.97px;
height: 12.19px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;

## Detalhes – Description
/* Description */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;

width: 1200px;
height: 340px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 184 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 316px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 183 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;

width: 1200px;
height: 280px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 182 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 256px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 181 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;

width: 1200px;
height: 220px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 180 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 196px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 179 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 12px;

width: 1200px;
height: 160px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 178 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 177 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 530px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 176 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 161px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Detalhes do NFT */

width: 161px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Line 6 */

width: 161px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Avaliações de colecionadores (19) */

width: 337px;
height: 16px;

/* Body Large/17 Regular · lh 16

combo:17|Regular|16px|0% | usos: 1
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 5 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Emerald Ape #042 é uma obra digital 1/50 finalizada à mão da coleção Kurio Editions. Cada atributo fica armazenado nos metadados do token e verificado na Ethereum. A obra explora identidade, movimento e luz em um mundo digital sem fronteiras.  A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede. Nova Sato recebe 5% de direitos autorais nas vendas secundárias, apoiando novos trabalhos e lançamentos da comunidade. */

width: 1200px;
height: 120px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Rede: */

width: 1200px;
height: 24px;

/* Body/14 Bold · lh 24

combo:14|Bold|24px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cunhado na Ethereum com procedência imutável e metadados armazenados no IPFS. */

width: 1200px;
height: 24px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Contrato: */

width: 1200px;
height: 24px;

/* Body/14 Bold · lh 24

combo:14|Bold|24px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Creator royalty: 5% on secondary sales, paid automatically by supported marketpl */

width: 1200px;
height: 24px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Direitos autorais: */

width: 1200px;
height: 24px;

/* Body/14 Bold · lh 24

combo:14|Bold|24px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* 0x7A42...19E8 • Contrato inteligente ERC-721 verificado. */

width: 1200px;
height: 24px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


## Detalhes – Related Products
/* Related Products */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 407px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Section Heading */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Mais desta coleção */

width: 1200px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Line 7 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 204 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 32px;

width: 1200px;
height: 347px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 203 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 28px;

width: 1200px;
height: 303px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 202 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 219px;
height: 303px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Group 41 */

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 193 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 4px 12px 8px 20px;
gap: 10px;

position: absolute;
width: 219px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Collection Artwork 06 */

width: 190px;
height: 243px;

background: url(.png);
border-radius: 11px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 188 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 154px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cosmic Bloom #118 */

width: 154px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 1.29 ETH */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 201 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 220px;
height: 303px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Group 42 */

width: 220px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 194 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 4px 24px;
gap: 10px;

position: absolute;
width: 220px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Collection Artwork 07 */

width: 212px;
height: 212px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 13px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 189 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 154px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 154px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 1.39 ETH */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 200 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 219px;
height: 303px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Group 43 */

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 195 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 4px 24px;
gap: 10px;

position: absolute;
width: 219px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Collection Artwork 08 */

width: 212px;
height: 212px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 13px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 190 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 145px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 145px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 1.79 ETH */

width: 145px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 199 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 219px;
height: 303px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Group 44 */

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 196 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px 4px 28px;
gap: 10px;

position: absolute;
width: 219px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Collection Artwork 09 */

width: 213px;
height: 213px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 13px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 191 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 145px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Golden Beat #207 */

width: 145px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 0.99 ETH */

width: 145px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Group 45 */

width: 219px;
height: 303px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 198 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

position: absolute;
width: 219px;
height: 303px;
left: 981px;
top: 0px;



/* Frame 197 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px 4px 28px;
gap: 10px;

width: 219px;
height: 255px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Collection Artwork 10 */

width: 213px;
height: 213px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 13px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 192 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 163px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Golden Signal #160 */

width: 163px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* 0.39 ETH */

width: 163px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Carousel Dots */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 52px;
height: 12px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 28 */

box-sizing: border-box;

width: 12px;
height: 12px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 29 */

width: 12px;
height: 12px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 30 */

box-sizing: border-box;

width: 12px;
height: 12px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;

# Desktop / Carrinho de NFTs
## Carrinho – Top (itens + resumo)
/* Top */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 493px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 68px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Active Underline */

width: 68px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 416px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 357 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 244px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Início / Mercado / Carrinho */

width: 244px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart Body */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cart Table */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 782px;
height: 274px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Table Header */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 24px 0px 0px;
gap: 155px;

width: 782px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 350 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 250px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFTs */

width: 39px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 351 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 77px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Preço */

width: 49px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 352 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 75px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Edições */

width: 68px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 353 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 87px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Total */

width: 49px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 354 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 24px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Line 2 */

width: 782px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cart Items */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 782px;
height: 234px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Cart Item 1 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 0px 24px 0px 0px;
gap: 10px;

width: 782px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 348 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 58px;

margin: 0 auto;
width: 758px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 345 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

margin: 0 auto;
width: 250px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Cart Artwork 6 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 344 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Emerald Ape #042 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0042 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 343 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 77px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* 1.19 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 47 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 75px;
height: 30px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 20px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 4px 12px -2px rgba(20, 13, 10, 0.14902);
border-radius: 20px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 45.83%;
bottom: 45.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* 2 */

width: 11px;
height: 24px;

/* Body Large/17 Regular · lh 10

combo:17|Regular|10px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 24px;
/* identical to box height, or 141% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 20px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 4px 12px -2px rgba(20, 13, 10, 0.14902);
border-radius: 20px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Frame 342 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 87px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* 2.38 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 341 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Iconly/Curved/Delete */

width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Delete */

position: absolute;
width: 16.15px;
height: 18.48px;
left: 4.21px;
top: 2.71px;



/* Stroke 1 */

position: absolute;
left: 23.46%;
right: 21.04%;
top: 39.81%;
bottom: 11.68%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 17.56%;
right: 15.14%;
top: 25.02%;
bottom: 71.02%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 5 */

position: absolute;
left: 36.84%;
right: 34.42%;
top: 11.31%;
bottom: 73%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Cart Item 2 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 0px 24px 0px 0px;
gap: 10px;

width: 782px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 347 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 66px;

margin: 0 auto;
width: 758px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Frame 346 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

margin: 0 auto;
width: 250px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Cart Artwork 7 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 337 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 164px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0009 */

width: 164px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 338 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 77px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* 1.39 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 48 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 75px;
height: 30px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 20px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 4px 12px -2px rgba(20, 13, 10, 0.14902);
border-radius: 20px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 45.83%;
bottom: 45.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* 6 */

width: 11px;
height: 24px;

/* Body Large/17 Regular · lh 10

combo:17|Regular|10px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 24px;
/* identical to box height, or 141% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 20px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 4px 12px -2px rgba(20, 13, 10, 0.14902);
border-radius: 20px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Frame 349 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 87px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* 8.34 ETH */

width: 87px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 340 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Iconly/Curved/Delete */

width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Delete */

position: absolute;
width: 16.15px;
height: 18.48px;
left: 4.21px;
top: 2.71px;



/* Stroke 1 */

position: absolute;
left: 23.46%;
right: 21.04%;
top: 39.81%;
bottom: 11.68%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 17.56%;
right: 15.14%;
top: 25.02%;
bottom: 71.02%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 5 */

position: absolute;
left: 36.84%;
right: 34.42%;
top: 11.31%;
bottom: 73%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Cart Item 3 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 0px 24px 0px 0px;
gap: 10px;

width: 782px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame 336 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 51px;

margin: 0 auto;
width: 758px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Frame 334 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

margin: 0 auto;
width: 250px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFT Cart Artwork 8 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 333 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0552 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 335 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 77px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* 1.79 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 49 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 12px;

margin: 0 auto;
width: 75px;
height: 30px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 20px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 4px 12px -2px rgba(20, 13, 10, 0.14902);
border-radius: 20px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 45.83%;
bottom: 45.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* 9 */

margin: 0 auto;
width: 11px;
height: 24px;

/* Body Large/17 Regular · lh 10

combo:17|Regular|10px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 24px;
/* identical to box height, or 141% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Add Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 20px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border: 1px solid #140D0A;
box-shadow: 0px 4px 12px -2px rgba(20, 13, 10, 0.14902);
border-radius: 20px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Frame 331 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 87px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* 16.11 ETH */

width: 87px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 332 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

margin: 0 auto;
width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Iconly/Curved/Delete */

width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Delete */

position: absolute;
width: 16.15px;
height: 18.48px;
left: 4.21px;
top: 2.71px;



/* Stroke 1 */

position: absolute;
left: 23.46%;
right: 21.04%;
top: 39.81%;
bottom: 11.68%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 17.56%;
right: 15.14%;
top: 25.02%;
bottom: 71.02%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 5 */

position: absolute;
left: 36.84%;
right: 34.42%;
top: 11.31%;
bottom: 73%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Wallet Summary */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 332px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Heading */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 332px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Resumo da carteira */

width: 195px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Line 2 */

width: 332px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Promo Code */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 332px;
height: 64px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Código promocional */

width: 152px;
height: 16px;

/* Body/14 Bold · lh 16

combo:14|Bold|16px|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Promo Input */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 0px 0px 8px;

width: 332px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Digite o código promocional... */

width: 222px;
height: 16px;

/* Caption/12 Regular · lh 16

combo:12|Regular|16px|0% | usos: 4
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 355 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 102px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 0px 3px 3px 0px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Aplicar */

width: 64px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Fees */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 332px;
height: 112px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Subtotal */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 332px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Subtotal */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.83 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Discount */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 332px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Desconto do lançamento */

width: 199px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (-) 00.00 */

width: 82px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Network Fee */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 12px;

width: 332px;
height: 48px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 356 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 125px;

width: 332px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Taxa de rede */

width: 109px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.016 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Taxa estimada */

width: 94px;
height: 16px;

/* Caption/12 Regular · lh 16

combo:12|Regular|16px|0% | usos: 4
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Total */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 332px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Total */

width: 49px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.846 ETH */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Checkout CTA */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 12px;

width: 332px;
height: 72px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 332px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Conectar e finalizar */

width: 181px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Continuar explorando */

width: 181px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

## Carrinho – Related Products
/* Related Products */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 32px;

width: 1200px;
height: 411px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Section Heading */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1200px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Colecionadores também viram */

width: 276px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Line 7 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cards */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 307px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Product Card 1 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 219px;
height: 307px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Group 41 */

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 358 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 219px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Cart Artwork 1 */

width: 190px;
height: 243px;

background: url(.png);
border-radius: 15px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 366 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 154px;
height: 44px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cosmic Bloom #118 */

width: 154px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 1.29 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Product Card 2 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 220px;
height: 307px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Artwork */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 220px;
height: 255px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Cart Artwork 2 */

width: 212px;
height: 212px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 17px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 365 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 154px;
height: 44px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 154px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 1.39 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Product Card 3 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 219px;
height: 307px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Artwork */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 359 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 219px;
height: 255px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Cart Artwork 3 */

width: 212px;
height: 212px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 17px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 364 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 145px;
height: 44px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 145px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 1.79 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Product Card 4 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 219px;
height: 307px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Group 44 */

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 360 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: absolute;
width: 219px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Cart Artwork 4 */

width: 213px;
height: 213px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 17px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 363 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 145px;
height: 44px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Golden Beat #207 */

width: 145px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.99 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Product Card 5 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 219px;
height: 307px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Group 45 */

width: 219px;
height: 255px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 361 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: absolute;
width: 219px;
height: 255px;
left: 0px;
top: 0px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Cart Artwork 5 */

width: 213px;
height: 213px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 17px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 362 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 163px;
height: 44px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Golden Signal #160 */

width: 163px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.39 ETH */

width: 77px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Carousel Dots */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 52px;
height: 12px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Ellipse 28 */

box-sizing: border-box;

width: 12px;
height: 12px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 29 */

width: 12px;
height: 12px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 30 */

box-sizing: border-box;

width: 12px;
height: 12px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;

# Desktop / Pagamento

/* Checkout Page

Full checkout page content: header, breadcrumb and wallet payment form. Shared by the payment screen and the order-confirmation screen behind its modal. Dependency: its Arrow-Down instances resolve to the local main component 9:1589, which is parented inside the &quot;ENS Input&quot; frame on the collector profile screen — deleting or detaching that frame orphans them.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 903px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 68px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Active Underline */

width: 68px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Page Content (behind overlay) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 826px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Início / Mercado / Pagamento */

width: 253px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 327 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 292 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 763px;
height: 668px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Perfil do colecionador */

width: 763px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 291 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 640px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 290 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 289 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 266 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 239 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de exibição */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 72 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 271 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 240 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 55px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rede */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 268 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 267 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 159px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma rede */

width: 152px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 270 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 241 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 195px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Endereço da carteira */

width: 181px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 269 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 143px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Endereço 0x da carteira */

width: 194px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 274 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 242 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Tipo de carteira */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 273 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 272 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 126px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma carteira */

width: 185px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 244 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 243 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 69px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* E-mail */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 288 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Frame 284 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 283 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de usuário */

width: 136px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 73 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 282 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 281 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 141px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome do perfil */

width: 127px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 60 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 328 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 280 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 24px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ENS ou carteira secundária (opcional) */

width: 312px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 279 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 278 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 172px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Código de indicação */

width: 172px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 71 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 287 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 92px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 277 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 92px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Nome ENS */

width: 73px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 276 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 10px 8px 12px 10px;
gap: 10px;

width: 78px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 275 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;
gap: 6px;

width: 61px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* .eth */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Frame 285 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 204px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 31 */

box-sizing: border-box;

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Usar outra carteira? */

width: 181px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 286 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 350px;
height: 179px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Observação do colecionador (opcional) */

width: 350px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Rectangle 86 */

box-sizing: border-box;

width: 350px;
height: 152px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 325 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Seus NFTs */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 322 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 750px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 294 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 293 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 286px;

width: 405px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFTs */

width: 39px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Subtotal */

width: 77px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 2 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 326 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 234px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 321 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 0px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 320 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 390px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 1 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 295 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Emerald Ape #042 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0042 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 296 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 20px;

width: 150px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 2) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 2.38 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 319 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 318 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 384px;
height: 66px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 2 */

width: 66px;
height: 66px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 298 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 164px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0314 */

width: 164px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 297 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

width: 146px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 6) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 8.34 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 317 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 6px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 316 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 382px;
height: 65px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 3 */

width: 65px;
height: 65px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 299 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0088 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 300 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 147px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 9) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 16.11 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 315 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 12px;

width: 405px;
height: 180px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Tem um código promocional? Aplique aqui */

width: 405px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 301 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 150px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Subtotal */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.83 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 302 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 62px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Desconto do lançamento */

margin: 0 auto;
width: 199px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (-) 00.00 */

margin: 0 auto;
width: 82px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 303 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 114px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Taxa de rede */

width: 109px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.016 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Taxa estimada */

width: 405px;
height: 16px;

/* Caption/12 Regular · lh 16

combo:12|Regular|16px|0% | usos: 4
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */
text-align: center;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Line 3 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 304 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 163px;

width: 321px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Total */

width: 49px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.846 ETH */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 314 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 405px;
height: 272px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Carteira e rede */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 313 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 405px;
height: 236px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 312 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 405px;
height: 167px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 307 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 60px 8px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 306 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 250px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 32 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 305 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 0px 8px 8px;
gap: 10px;

width: 224px;
height: 26px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;
/* Color/Border Soft

#55321F — vinculado à variável color/border-soft
*/
border: 1px solid #55321F;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Supported wallet brands */

width: 215px;
height: 12px;

/* Tiny/9 Bold

combo:9|Bold|AUTO|0.1px | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 9px;
line-height: 12px;
/* identical to box height */
letter-spacing: 0.1px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 309 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 211px 16px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 308 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 99px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* MetaMask */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 311 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 148px 16px 16px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 310 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 187px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 323 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 39px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Ellipse 35 */

position: absolute;
width: 10px;
height: 10px;
left: 3px;
top: 3px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Coinbase Wallet */

width: 136px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 324 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 16px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Confirmar compra */

width: 373px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */
text-align: center;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;

# Desktop / Carrinho de NFTs

/* Checkout Page

Full checkout page content: header, breadcrumb and wallet payment form. Shared by the payment screen and the order-confirmation screen behind its modal. Dependency: its Arrow-Down instances resolve to the local main component 9:1589, which is parented inside the &quot;ENS Input&quot; frame on the collector profile screen — deleting or detaching that frame orphans them.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 903px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 68px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Active Underline */

width: 68px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Page Content (behind overlay) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 826px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Início / Mercado / Pagamento */

width: 253px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 327 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 292 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 763px;
height: 668px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Perfil do colecionador */

width: 763px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 291 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 640px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 290 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 289 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 266 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 239 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de exibição */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 72 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 271 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 240 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 55px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rede */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 268 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 267 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 159px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma rede */

width: 152px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 270 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 241 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 195px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Endereço da carteira */

width: 181px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 269 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 143px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Endereço 0x da carteira */

width: 194px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 274 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 242 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Tipo de carteira */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 273 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 272 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 126px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma carteira */

width: 185px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 244 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 243 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 69px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* E-mail */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 288 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Frame 284 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 283 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de usuário */

width: 136px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 73 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 282 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 281 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 141px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome do perfil */

width: 127px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 60 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 328 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 280 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 24px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ENS ou carteira secundária (opcional) */

width: 312px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 279 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 278 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 172px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Código de indicação */

width: 172px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 71 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 287 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 92px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 277 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 92px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Nome ENS */

width: 73px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 276 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 10px 8px 12px 10px;
gap: 10px;

width: 78px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 275 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;
gap: 6px;

width: 61px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* .eth */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Frame 285 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 204px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 31 */

box-sizing: border-box;

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Usar outra carteira? */

width: 181px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 286 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 350px;
height: 179px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Observação do colecionador (opcional) */

width: 350px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Rectangle 86 */

box-sizing: border-box;

width: 350px;
height: 152px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 325 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Seus NFTs */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 322 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 750px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 294 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 293 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 286px;

width: 405px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFTs */

width: 39px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Subtotal */

width: 77px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 2 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 326 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 234px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 321 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 0px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 320 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 390px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 1 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 295 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Emerald Ape #042 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0042 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 296 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 20px;

width: 150px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 2) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 2.38 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 319 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 318 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 384px;
height: 66px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 2 */

width: 66px;
height: 66px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 298 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 164px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0314 */

width: 164px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 297 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

width: 146px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 6) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 8.34 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 317 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 6px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 316 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 382px;
height: 65px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 3 */

width: 65px;
height: 65px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 299 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0088 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 300 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 147px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 9) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 16.11 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 315 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 12px;

width: 405px;
height: 180px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Tem um código promocional? Aplique aqui */

width: 405px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 301 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 150px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Subtotal */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.83 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 302 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 62px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Desconto do lançamento */

margin: 0 auto;
width: 199px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (-) 00.00 */

margin: 0 auto;
width: 82px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 303 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 114px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Taxa de rede */

width: 109px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.016 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Taxa estimada */

width: 405px;
height: 16px;

/* Caption/12 Regular · lh 16

combo:12|Regular|16px|0% | usos: 4
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */
text-align: center;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Line 3 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 304 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 163px;

width: 321px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Total */

width: 49px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.846 ETH */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 314 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 405px;
height: 272px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Carteira e rede */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 313 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 405px;
height: 236px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 312 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 405px;
height: 167px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 307 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 60px 8px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 306 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 250px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 32 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 305 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 0px 8px 8px;
gap: 10px;

width: 224px;
height: 26px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;
/* Color/Border Soft

#55321F — vinculado à variável color/border-soft
*/
border: 1px solid #55321F;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Supported wallet brands */

width: 215px;
height: 12px;

/* Tiny/9 Bold

combo:9|Bold|AUTO|0.1px | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 9px;
line-height: 12px;
/* identical to box height */
letter-spacing: 0.1px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 309 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 211px 16px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 308 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 99px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* MetaMask */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 311 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 148px 16px 16px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 310 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 187px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 323 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 39px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Ellipse 35 */

position: absolute;
width: 10px;
height: 10px;
left: 3px;
top: 3px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Coinbase Wallet */

width: 136px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 324 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 16px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Confirmar compra */

width: 373px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */
text-align: center;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;

# Desktop / Pagamento
## Pagamento – Checkout Page

/* Checkout Page

Full checkout page content: header, breadcrumb and wallet payment form. Shared by the payment screen and the order-confirmation screen behind its modal. Dependency: its Arrow-Down instances resolve to the local main component 9:1589, which is parented inside the &quot;ENS Input&quot; frame on the collector profile screen — deleting or detaching that frame orphans them.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 903px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 68px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Active Underline */

width: 68px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Page Content (behind overlay) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 826px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Início / Mercado / Pagamento */

width: 253px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 327 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 292 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 763px;
height: 668px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Perfil do colecionador */

width: 763px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 291 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 640px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 290 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 289 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 266 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 239 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de exibição */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 72 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 271 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 240 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 55px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rede */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 268 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 267 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 159px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma rede */

width: 152px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 270 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 241 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 195px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Endereço da carteira */

width: 181px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 269 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 143px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Endereço 0x da carteira */

width: 194px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 274 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 242 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Tipo de carteira */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 273 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 272 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 126px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma carteira */

width: 185px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 244 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 243 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 69px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* E-mail */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 288 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Frame 284 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 283 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de usuário */

width: 136px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 73 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 282 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 281 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 141px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome do perfil */

width: 127px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 60 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 328 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 280 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 24px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ENS ou carteira secundária (opcional) */

width: 312px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 279 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 278 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 172px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Código de indicação */

width: 172px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 71 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 287 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 92px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 277 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 92px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Nome ENS */

width: 73px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 276 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 10px 8px 12px 10px;
gap: 10px;

width: 78px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 275 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;
gap: 6px;

width: 61px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* .eth */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Frame 285 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 204px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 31 */

box-sizing: border-box;

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Usar outra carteira? */

width: 181px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 286 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 350px;
height: 179px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Observação do colecionador (opcional) */

width: 350px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Rectangle 86 */

box-sizing: border-box;

width: 350px;
height: 152px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 325 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Seus NFTs */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 322 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 750px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 294 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 293 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 286px;

width: 405px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFTs */

width: 39px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Subtotal */

width: 77px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 2 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 326 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 234px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 321 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 0px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 320 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 390px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 1 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 295 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Emerald Ape #042 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0042 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 296 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 20px;

width: 150px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 2) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 2.38 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 319 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 318 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 384px;
height: 66px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 2 */

width: 66px;
height: 66px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 298 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 164px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0314 */

width: 164px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 297 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

width: 146px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 6) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 8.34 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 317 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 6px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 316 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 382px;
height: 65px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 3 */

width: 65px;
height: 65px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 299 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0088 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 300 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 147px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 9) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 16.11 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 315 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 12px;

width: 405px;
height: 180px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Tem um código promocional? Aplique aqui */

width: 405px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 301 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 150px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Subtotal */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.83 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 302 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 62px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Desconto do lançamento */

margin: 0 auto;
width: 199px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (-) 00.00 */

margin: 0 auto;
width: 82px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 303 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 114px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Taxa de rede */

width: 109px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.016 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Taxa estimada */

width: 405px;
height: 16px;

/* Caption/12 Regular · lh 16

combo:12|Regular|16px|0% | usos: 4
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */
text-align: center;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Line 3 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 304 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 163px;

width: 321px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Total */

width: 49px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.846 ETH */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 314 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 405px;
height: 272px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Carteira e rede */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 313 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 405px;
height: 236px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 312 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 405px;
height: 167px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 307 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 60px 8px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 306 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 250px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 32 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 305 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 0px 8px 8px;
gap: 10px;

width: 224px;
height: 26px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;
/* Color/Border Soft

#55321F — vinculado à variável color/border-soft
*/
border: 1px solid #55321F;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Supported wallet brands */

width: 215px;
height: 12px;

/* Tiny/9 Bold

combo:9|Bold|AUTO|0.1px | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 9px;
line-height: 12px;
/* identical to box height */
letter-spacing: 0.1px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 309 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 211px 16px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 308 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 99px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* MetaMask */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 311 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 148px 16px 16px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 310 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 187px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 323 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 39px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Ellipse 35 */

position: absolute;
width: 10px;
height: 10px;
left: 3px;
top: 3px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Coinbase Wallet */

width: 136px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 324 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 16px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Confirmar compra */

width: 373px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */
text-align: center;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;

# Desktop / Confirmação de Pedido
## Confirmação (frame inteiro)
/* Checkout Page

Full checkout page content: header, breadcrumb and wallet payment form. Shared by the payment screen and the order-confirmation screen behind its modal. Dependency: its Arrow-Down instances resolve to the local main component 9:1589, which is parented inside the &quot;ENS Input&quot; frame on the collector profile screen — deleting or detaching that frame orphans them.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 903px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 68px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Active Underline */

width: 68px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Page Content (behind overlay) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 826px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Início / Mercado / Pagamento */

width: 253px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 327 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 292 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 763px;
height: 668px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Perfil do colecionador */

width: 763px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 291 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 640px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 290 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 763px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 289 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 266 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 239 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de exibição */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 72 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 271 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 240 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 55px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rede */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 268 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 267 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 159px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma rede */

width: 152px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 270 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 241 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 195px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Endereço da carteira */

width: 181px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 269 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 143px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Endereço 0x da carteira */

width: 194px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 274 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 242 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Tipo de carteira */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 273 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 8px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 272 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 126px;

width: 329px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Selecione uma carteira */

width: 185px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Frame 244 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 243 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 69px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* E-mail */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 288 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 369.5px;
height: 393px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Frame 284 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 283 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de usuário */

width: 136px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 73 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 282 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 281 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 141px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome do perfil */

width: 127px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 60 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 328 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 280 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 24px 12px 12px;
gap: 10px;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ENS ou carteira secundária (opcional) */

width: 312px;
height: 15px;

/* Body/14 Regular · lh 15

combo:14|Regular|15px|0% | usos: 16
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 15px;
/* identical to box height, or 107% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 279 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 369.5px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 278 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 172px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Código de indicação */

width: 172px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 71 */

box-sizing: border-box;

width: 369.5px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 287 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 92px;
height: 69px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 277 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 92px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Nome ENS */

width: 73px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 276 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 10px 8px 12px 10px;
gap: 10px;

width: 78px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 275 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;
gap: 6px;

width: 61px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* .eth */

width: 37px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Arrow-Down */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Frame 285 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 204px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ellipse 31 */

box-sizing: border-box;

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Usar outra carteira? */

width: 181px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 286 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 350px;
height: 179px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Observação do colecionador (opcional) */

width: 350px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Rectangle 86 */

box-sizing: border-box;

width: 350px;
height: 152px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 325 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 778px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Seus NFTs */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 322 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 750px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 294 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 293 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 286px;

width: 405px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* NFTs */

width: 39px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Subtotal */

width: 77px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 2 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 326 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 405px;
height: 234px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 321 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 0px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 320 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 390px;
height: 70px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 1 */

width: 70px;
height: 70px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 295 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Emerald Ape #042 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0042 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 296 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 20px;

width: 150px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 2) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 2.38 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 319 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 4px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 318 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 384px;
height: 66px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 2 */

width: 66px;
height: 66px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 298 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 164px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Violet Nomad #314 */

width: 164px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0314 */

width: 164px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 297 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

width: 146px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 6) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 8.34 ETH */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 317 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px 4px 6px;
gap: 10px;

width: 405px;
height: 70px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 316 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 382px;
height: 65px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* NFT Receipt Artwork 3 */

width: 65px;
height: 65px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 299 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 154px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Ivory Baron #088 */

width: 154px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* ID do token: #0088 */

width: 154px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 300 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 147px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* (x 9) */

width: 43px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 16.11 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 315 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 12px;

width: 405px;
height: 180px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Tem um código promocional? Aplique aqui */

width: 405px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 301 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 150px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Subtotal */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.83 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 302 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 62px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Desconto do lançamento */

margin: 0 auto;
width: 199px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (-) 00.00 */

margin: 0 auto;
width: 82px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 303 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 114px;

width: 405px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Taxa de rede */

width: 109px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 0.016 ETH */

width: 98px;
height: 16px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Taxa estimada */

width: 405px;
height: 16px;

/* Caption/12 Regular · lh 16

combo:12|Regular|16px|0% | usos: 4
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */
text-align: center;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Line 3 */

width: 405px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 304 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 163px;

width: 321px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Total */

width: 49px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* 26.846 ETH */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 314 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 405px;
height: 272px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Carteira e rede */

width: 405px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 313 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 405px;
height: 236px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 312 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 405px;
height: 167px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 307 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 60px 8px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 306 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 250px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 32 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 305 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 0px 8px 8px;
gap: 10px;

width: 224px;
height: 26px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;
/* Color/Border Soft

#55321F — vinculado à variável color/border-soft
*/
border: 1px solid #55321F;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Supported wallet brands */

width: 215px;
height: 12px;

/* Tiny/9 Bold

combo:9|Bold|AUTO|0.1px | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 9px;
line-height: 12px;
/* identical to box height */
letter-spacing: 0.1px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 309 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 211px 16px 12px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 308 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 99px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* MetaMask */

width: 73px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 311 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 148px 16px 16px;
gap: 10px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 310 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 187px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 323 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 12px;
isolation: isolate;

width: 39px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Ellipse 33 */

box-sizing: border-box;

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.2px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Ellipse 35 */

position: absolute;
width: 10px;
height: 10px;
left: 3px;
top: 3px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Coinbase Wallet */

width: 136px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 324 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 16px;

width: 405px;
height: 45px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Confirmar compra */

width: 373px;
height: 16px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */
text-align: center;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;

# Desktop / Login
## Login (frame inteiro)
/* Marketplace Page

Full marketplace home page content shown behind the sign-in and sign-up modals: banner, sort row, product grid and filters panel. Its header is an instance of Header With Divider. Known unfixed defects frozen here: an orphan duplicate price label &quot;2.29 ETH&quot; overlapping a card, and a square-cornered RARO chip overhanging a rounded card corner — fixing either one here now updates both auth screens at once.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1206px;
height: 1957px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Header With Divider

Header Row plus the hairline divider beneath it. Used on the five sites that already show the divider: the home, collector profile and wallets screens, and inside Marketplace Page, which the two auth screens instance. Market screens intentionally use a bare Header Row with no divider.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 58px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Active Underline */

width: 58px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 16.28px;
height: 15.42px;
left: 1.88px;
top: 2.29px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 1 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Page Content (behind overlay) */

width: 1206px;
height: 1900px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Main Banner */

position: absolute;
width: 1200px;
height: 450px;
left: 5px;
top: 0px;



/* Rectangle 3 */

position: absolute;
width: 1200px;
height: 450px;
left: 5px;
top: 0px;



/* NFT Auth Artwork 1 */

position: absolute;
width: 450px;
height: 450px;
left: 755px;
top: 0px;

background: url(.png);
border-radius: 16px;


/* NFT Auth Artwork 2 */

position: absolute;
visibility: hidden;
width: 120px;
height: 120px;
left: 795px;
top: 280px;

background: url(.png);
border-radius: 16px;


/* OWN THE FUTURE OF
DIGITAL ART */

position: absolute;
width: 600px;
height: 140px;
left: 45px;
top: 91px;

/* Display/43 Bold

combo:43|Bold|70px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 70px;
/* or 163% */

/* Color/Foreground */
color: #F5F1EB;



/* Bem-vindo à Kurio */

position: absolute;
width: 166px;
height: 16px;
left: 48px;
top: 68px;

/* Body/14 Medium · lh 16

combo:14|Medium|16px|10% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Descubra NFTs selecionados de criadores do mundo todo e colecione arte digital verificada. */

position: absolute;
width: 557px;
height: 45px;
left: 48px;
top: 236px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */

/* Text/Secondary */
color: #CFB28C;



/* Rectangle 4 */

position: absolute;
width: 140px;
height: 40px;
left: 46px;
top: 325px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* EXPLORAR */

position: absolute;
width: 77px;
height: 20px;
left: 75px;
top: 335px;

/* Body Large/16 Bold · lh 20

combo:16|Bold|20px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

/* Color/Ink */
color: #140D0A;



/* Group 4 */

position: absolute;
width: 40px;
height: 8px;
left: 585px;
top: 425px;



/* Ellipse 2 */

position: absolute;
width: 8px;
height: 8px;
left: 601px;
top: 425px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Ellipse 3 */

position: absolute;
width: 8px;
height: 8px;
left: 617px;
top: 425px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Ellipse 4 */

position: absolute;
width: 8px;
height: 8px;
left: 585px;
top: 425px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Short By */

position: absolute;
width: 846px;
height: 23px;
left: 365px;
top: 496px;



/* Todos os NFTs */

position: absolute;
width: 118px;
height: 16px;
left: 365px;
top: 496px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Text/Accent */
color: #E89B55;



/* Novos lançamentos */

position: absolute;
width: 154px;
height: 20px;
left: 505px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Em alta */

position: absolute;
width: 64px;
height: 20px;
left: 678px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Ordenar por: */

position: absolute;
width: 109px;
height: 20px;
left: 911px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Listados recentemente */

position: absolute;
width: 190px;
height: 20px;
left: 1021px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Line 3 */

position: absolute;
width: 104px;
height: 0px;
left: 365px;
top: 519px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;


/* Iconly/Two-tone/Arrow - Down 2 */

position: absolute;
width: 16px;
height: 16px;
left: 1189px;
top: 498px;



/* Iconly/Two-tone/Arrow - Down 2 */

position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;



/* Arrow - Down 2 */

position: absolute;
width: 9.33px;
height: 4.67px;
left: 3.33px;
top: 5.67px;



/* Stroke 1 */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 35.42%;
bottom: 35.42%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
border: 1.5px solid #F5F1EB;


/* Products */

position: absolute;
width: 840px;
height: 1190px;
left: 365px;
top: 550px;



/* Emerald Ape #042 */

position: absolute;
width: 154px;
height: 16px;
left: 365px;
top: 862px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Cosmic Bloom #118 */

position: absolute;
width: 164px;
height: 16px;
left: 365px;
top: 1282px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Golden Beat #207 */

position: absolute;
width: 154px;
height: 16px;
left: 365px;
top: 1702px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Sage Nomad #009 */

position: absolute;
width: 145px;
height: 16px;
left: 656px;
top: 862px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Violet Nomad #314 */

position: absolute;
width: 164px;
height: 16px;
left: 656px;
top: 1282px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Golden Frequency #071 */

position: absolute;
width: 202px;
height: 16px;
left: 656px;
top: 1702px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Neon Vessel #552 */

position: absolute;
width: 154px;
height: 16px;
left: 947px;
top: 862px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Ivory Baron #088 */

position: absolute;
width: 154px;
height: 16px;
left: 947px;
top: 1282px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Golden Signal #160 */

position: absolute;
width: 173px;
height: 16px;
left: 947px;
top: 1702px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* 1.19 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 365px;
top: 884px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.29 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 365px;
top: 1304px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 0.99 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 365px;
top: 1724px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.69 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 656px;
top: 884px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.39 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 656px;
top: 1304px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 0.59 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 656px;
top: 1724px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.99 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 947px;
top: 884px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.79 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 947px;
top: 1304px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 0.39 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 947px;
top: 1724px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 2.29 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 1046px;
top: 884px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Secondary */
color: #B39463;



/* Rectangle 6 */

position: absolute;
width: 258px;
height: 300px;
left: 365px;
top: 550px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 11 */

position: absolute;
width: 258px;
height: 300px;
left: 365px;
top: 970px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 16 */

position: absolute;
width: 258px;
height: 300px;
left: 365px;
top: 1390px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 7 */

position: absolute;
width: 258px;
height: 300px;
left: 656px;
top: 550px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 12 */

position: absolute;
width: 258px;
height: 300px;
left: 656px;
top: 970px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 17 */

position: absolute;
width: 258px;
height: 300px;
left: 656px;
top: 1390px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 10 */

position: absolute;
width: 258px;
height: 1px;
left: 656px;
top: 550px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Rectangle 8 */

position: absolute;
width: 258px;
height: 300px;
left: 947px;
top: 550px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 14 */

position: absolute;
width: 258px;
height: 300px;
left: 947px;
top: 970px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 19 */

position: absolute;
width: 258px;
height: 300px;
left: 947px;
top: 1390px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Auth Artwork 3 */

position: absolute;
width: 250px;
height: 250px;
left: 369px;
top: 581px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 4 */

position: absolute;
width: 250px;
height: 250px;
left: 660px;
top: 575px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 5 */

position: absolute;
width: 250px;
height: 250px;
left: 951px;
top: 574px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* Line 4 */

position: absolute;
width: 65px;
height: 0px;
left: 1028px;
top: 893px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;


/* Rectangle 9 */

position: absolute;
width: 80px;
height: 29px;
left: 947px;
top: 564px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* RARO */

position: absolute;
width: 39px;
height: 16px;
left: 962px;
top: 571px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Ink */
color: #140D0A;



/* Group 5 */

position: absolute;
width: 125px;
height: 35px;
left: 723px;
top: 808px;



/* Rectangle 11 */

box-sizing: border-box;

position: absolute;
width: 35px;
height: 35px;
left: 723px;
top: 808px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;


/* Rectangle 12 */

box-sizing: border-box;

position: absolute;
width: 35px;
height: 35px;
left: 768px;
top: 808px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;


/* Rectangle 13 */

box-sizing: border-box;

position: absolute;
width: 35px;
height: 35px;
left: 813px;
top: 808px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;


/* shopping 1 */

position: absolute;
width: 20px;
height: 20px;
left: 729px;
top: 816px;



/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 0.01%;
bottom: 0.01%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* heart 1 */

position: absolute;
width: 20px;
height: 20px;
left: 775px;
top: 816px;



/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 5.47%;
bottom: 5.56%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Frame */

position: absolute;
width: 19.99px;
height: 20px;
left: 822px;
top: 815px;



/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* NFT Auth Artwork 6 */

position: absolute;
width: 224px;
height: 286px;
left: 386px;
top: 976px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 7 */

position: absolute;
width: 250px;
height: 250px;
left: 660px;
top: 993px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 8 */

position: absolute;
width: 250px;
height: 250px;
left: 951px;
top: 993px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 9 */

position: absolute;
width: 250px;
height: 250px;
left: 369px;
top: 1408px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 10 */

position: absolute;
width: 250px;
height: 250px;
left: 660px;
top: 1418px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 11 */

position: absolute;
width: 250px;
height: 250px;
left: 951px;
top: 1409px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* Filters

Marketplace sidebar filter panel, 310 wide: collection checkboxes with counts, price range with Apply, and network checkboxes. Fixed 310 width — the host column owns the placement. Content is identical on every screen; no per-instance overrides expected.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;

position: absolute;
width: 310px;
height: 785px;
left: 5px;
top: 496px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Frame 140 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 270px;
height: 745px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Collections Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Coleções */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* List */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 12px;

width: 270px;
height: 360px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 382 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 373 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 109px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships */

width: 109px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (33) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 383 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 374 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 91px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 91px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (12) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 384 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 375 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 55px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 55px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (65) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 385 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 376 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 64px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 64px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (39) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 390 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 377 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 118px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (23) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 389 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 378 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 91px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 91px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (17) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 388 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Frame 379 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 46px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 46px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (19) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 387 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Frame 380 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 100px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 100px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (13) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 386 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Frame 381 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 82px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 82px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (18) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Price Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 129px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Faixa de preço */

width: 152px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Controls */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 12px;
gap: 12px;

width: 270px;
height: 101px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Slider */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
isolation: isolate;

width: 258px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Ellipse 5 */

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 3px solid #140D0A;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 3;


/* Line 6 */

width: 161px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 4px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 2;


/* Ellipse 6 */

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 3px solid #140D0A;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 1;


/* Line 5 */

width: 55px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 4px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;
z-index: 0;


/* Frame 391 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 258px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Preço: 0,02 - 12,30 ETH */

width: 208px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Apply Button */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 12px;

width: 92px;
height: 36px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aplicar */

width: 68px;
height: 20px;

/* Body Large/16 Bold · lh 20

combo:16|Bold|20px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Network Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 148px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Rede */

width: 44px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* List */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 12px;

width: 270px;
height: 120px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 392 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 73px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (119) */

margin: 0 auto;
width: 46px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 393 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 64px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (78) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 394 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 55px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (86) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


# Desktop / Cadastro
## Cadastro (frame inteiro)
/* Marketplace Page

Full marketplace home page content shown behind the sign-in and sign-up modals: banner, sort row, product grid and filters panel. Its header is an instance of Header With Divider. Known unfixed defects frozen here: an orphan duplicate price label &quot;2.29 ETH&quot; overlapping a card, and a square-cornered RARO chip overhanging a rounded card corner — fixing either one here now updates both auth screens at once.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 1206px;
height: 1957px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Header With Divider

Header Row plus the hairline divider beneath it. Used on the five sites that already show the divider: the home, collector profile and wallets screens, and inside Marketplace Page, which the two auth screens instance. Market screens intentionally use a bare Header Row with no divider.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 58px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Active Underline */

width: 58px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 16.28px;
height: 15.42px;
left: 1.88px;
top: 2.29px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 1 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Page Content (behind overlay) */

width: 1206px;
height: 1900px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Main Banner */

position: absolute;
width: 1200px;
height: 450px;
left: 5px;
top: 0px;



/* Rectangle 3 */

position: absolute;
width: 1200px;
height: 450px;
left: 5px;
top: 0px;



/* NFT Auth Artwork 1 */

position: absolute;
width: 450px;
height: 450px;
left: 755px;
top: 0px;

background: url(.png);
border-radius: 16px;


/* NFT Auth Artwork 2 */

position: absolute;
visibility: hidden;
width: 120px;
height: 120px;
left: 795px;
top: 280px;

background: url(.png);
border-radius: 16px;


/* OWN THE FUTURE OF
DIGITAL ART */

position: absolute;
width: 600px;
height: 140px;
left: 45px;
top: 91px;

/* Display/43 Bold

combo:43|Bold|70px|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 70px;
/* or 163% */

/* Color/Foreground */
color: #F5F1EB;



/* Bem-vindo à Kurio */

position: absolute;
width: 166px;
height: 16px;
left: 48px;
top: 68px;

/* Body/14 Medium · lh 16

combo:14|Medium|16px|10% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Descubra NFTs selecionados de criadores do mundo todo e colecione arte digital verificada. */

position: absolute;
width: 557px;
height: 45px;
left: 48px;
top: 236px;

/* Body/14 Regular · lh 24

combo:14|Regular|24px|0% | usos: 12
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
/* or 171% */

/* Text/Secondary */
color: #CFB28C;



/* Rectangle 4 */

position: absolute;
width: 140px;
height: 40px;
left: 46px;
top: 325px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* EXPLORAR */

position: absolute;
width: 77px;
height: 20px;
left: 75px;
top: 335px;

/* Body Large/16 Bold · lh 20

combo:16|Bold|20px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

/* Color/Ink */
color: #140D0A;



/* Group 4 */

position: absolute;
width: 40px;
height: 8px;
left: 585px;
top: 425px;



/* Ellipse 2 */

position: absolute;
width: 8px;
height: 8px;
left: 601px;
top: 425px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Ellipse 3 */

position: absolute;
width: 8px;
height: 8px;
left: 617px;
top: 425px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Ellipse 4 */

position: absolute;
width: 8px;
height: 8px;
left: 585px;
top: 425px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Short By */

position: absolute;
width: 846px;
height: 23px;
left: 365px;
top: 496px;



/* Todos os NFTs */

position: absolute;
width: 118px;
height: 16px;
left: 365px;
top: 496px;

/* Body/15 Bold · lh 16

combo:15|Bold|16px|0% | usos: 21
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 16px;
/* identical to box height, or 107% */

/* Text/Accent */
color: #E89B55;



/* Novos lançamentos */

position: absolute;
width: 154px;
height: 20px;
left: 505px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Em alta */

position: absolute;
width: 64px;
height: 20px;
left: 678px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Ordenar por: */

position: absolute;
width: 109px;
height: 20px;
left: 911px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Listados recentemente */

position: absolute;
width: 190px;
height: 20px;
left: 1021px;
top: 496px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;



/* Line 3 */

position: absolute;
width: 104px;
height: 0px;
left: 365px;
top: 519px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 2px solid #D28A4C;


/* Iconly/Two-tone/Arrow - Down 2 */

position: absolute;
width: 16px;
height: 16px;
left: 1189px;
top: 498px;



/* Iconly/Two-tone/Arrow - Down 2 */

position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;



/* Arrow - Down 2 */

position: absolute;
width: 9.33px;
height: 4.67px;
left: 3.33px;
top: 5.67px;



/* Stroke 1 */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 35.42%;
bottom: 35.42%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
border: 1.5px solid #F5F1EB;


/* Products */

position: absolute;
width: 840px;
height: 1190px;
left: 365px;
top: 550px;



/* Emerald Ape #042 */

position: absolute;
width: 154px;
height: 16px;
left: 365px;
top: 862px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Cosmic Bloom #118 */

position: absolute;
width: 164px;
height: 16px;
left: 365px;
top: 1282px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Golden Beat #207 */

position: absolute;
width: 154px;
height: 16px;
left: 365px;
top: 1702px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Sage Nomad #009 */

position: absolute;
width: 145px;
height: 16px;
left: 656px;
top: 862px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Violet Nomad #314 */

position: absolute;
width: 164px;
height: 16px;
left: 656px;
top: 1282px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Golden Frequency #071 */

position: absolute;
width: 202px;
height: 16px;
left: 656px;
top: 1702px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Neon Vessel #552 */

position: absolute;
width: 154px;
height: 16px;
left: 947px;
top: 862px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Ivory Baron #088 */

position: absolute;
width: 154px;
height: 16px;
left: 947px;
top: 1282px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Golden Signal #160 */

position: absolute;
width: 173px;
height: 16px;
left: 947px;
top: 1702px;

/* Body Large/16 Regular · lh 16

combo:16|Regular|16px|0% | usos: 31
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* 1.19 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 365px;
top: 884px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.29 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 365px;
top: 1304px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 0.99 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 365px;
top: 1724px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.69 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 656px;
top: 884px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.39 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 656px;
top: 1304px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 0.59 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 656px;
top: 1724px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.99 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 947px;
top: 884px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 1.79 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 947px;
top: 1304px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 0.39 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 947px;
top: 1724px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Text/Accent */
color: #E89B55;



/* 2.29 ETH */

position: absolute;
width: 87px;
height: 16px;
left: 1046px;
top: 884px;

/* Body Large/18 Regular

combo:18|Regular|16px|0% | usos: 10
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Secondary */
color: #B39463;



/* Rectangle 6 */

position: absolute;
width: 258px;
height: 300px;
left: 365px;
top: 550px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 11 */

position: absolute;
width: 258px;
height: 300px;
left: 365px;
top: 970px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 16 */

position: absolute;
width: 258px;
height: 300px;
left: 365px;
top: 1390px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 7 */

position: absolute;
width: 258px;
height: 300px;
left: 656px;
top: 550px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 12 */

position: absolute;
width: 258px;
height: 300px;
left: 656px;
top: 970px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 17 */

position: absolute;
width: 258px;
height: 300px;
left: 656px;
top: 1390px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 10 */

position: absolute;
width: 258px;
height: 1px;
left: 656px;
top: 550px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Rectangle 8 */

position: absolute;
width: 258px;
height: 300px;
left: 947px;
top: 550px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 14 */

position: absolute;
width: 258px;
height: 300px;
left: 947px;
top: 970px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Rectangle 19 */

position: absolute;
width: 258px;
height: 300px;
left: 947px;
top: 1390px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* NFT Auth Artwork 3 */

position: absolute;
width: 250px;
height: 250px;
left: 369px;
top: 581px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 4 */

position: absolute;
width: 250px;
height: 250px;
left: 660px;
top: 575px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 5 */

position: absolute;
width: 250px;
height: 250px;
left: 951px;
top: 574px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* Line 4 */

position: absolute;
width: 65px;
height: 0px;
left: 1028px;
top: 893px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;


/* Rectangle 9 */

position: absolute;
width: 80px;
height: 29px;
left: 947px;
top: 564px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* RARO */

position: absolute;
width: 39px;
height: 16px;
left: 962px;
top: 571px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Ink */
color: #140D0A;



/* Group 5 */

position: absolute;
width: 125px;
height: 35px;
left: 723px;
top: 808px;



/* Rectangle 11 */

box-sizing: border-box;

position: absolute;
width: 35px;
height: 35px;
left: 723px;
top: 808px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;


/* Rectangle 12 */

box-sizing: border-box;

position: absolute;
width: 35px;
height: 35px;
left: 768px;
top: 808px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;


/* Rectangle 13 */

box-sizing: border-box;

position: absolute;
width: 35px;
height: 35px;
left: 813px;
top: 808px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 4px;


/* shopping 1 */

position: absolute;
width: 20px;
height: 20px;
left: 729px;
top: 816px;



/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 0.01%;
bottom: 0.01%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* heart 1 */

position: absolute;
width: 20px;
height: 20px;
left: 775px;
top: 816px;



/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 5.47%;
bottom: 5.56%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Frame */

position: absolute;
width: 19.99px;
height: 20px;
left: 822px;
top: 815px;



/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* NFT Auth Artwork 6 */

position: absolute;
width: 224px;
height: 286px;
left: 386px;
top: 976px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 7 */

position: absolute;
width: 250px;
height: 250px;
left: 660px;
top: 993px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 8 */

position: absolute;
width: 250px;
height: 250px;
left: 951px;
top: 993px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 9 */

position: absolute;
width: 250px;
height: 250px;
left: 369px;
top: 1408px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 10 */

position: absolute;
width: 250px;
height: 250px;
left: 660px;
top: 1418px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* NFT Auth Artwork 11 */

position: absolute;
width: 250px;
height: 250px;
left: 951px;
top: 1409px;

background: url(.png);
mix-blend-mode: normal;
border-radius: 16px;


/* Filters

Marketplace sidebar filter panel, 310 wide: collection checkboxes with counts, price range with Apply, and network checkboxes. Fixed 310 width — the host column owns the placement. Content is identical on every screen; no per-instance overrides expected.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;

position: absolute;
width: 310px;
height: 785px;
left: 5px;
top: 496px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;


/* Frame 140 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 270px;
height: 745px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Collections Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Coleções */

width: 87px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* List */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 12px;

width: 270px;
height: 360px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 382 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 373 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 109px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships */

width: 109px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (33) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 383 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 374 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 91px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 91px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (12) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 384 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Frame 375 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 55px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 55px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (65) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 385 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 376 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 64px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 64px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (39) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 390 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Frame 377 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 118px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (23) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 389 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 378 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 91px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 91px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (17) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 388 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Frame 379 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 46px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 46px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (19) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 387 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Frame 380 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 100px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 100px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (13) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 386 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 246px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Frame 381 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 82px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Collectibles
Generative
Gaming
Memberships
 */

width: 82px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (18) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Bold · lh 40

combo:15|Bold|40px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Price Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 129px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Faixa de preço */

width: 152px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Controls */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 12px;
gap: 12px;

width: 270px;
height: 101px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Slider */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
isolation: isolate;

width: 258px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Ellipse 5 */

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 3px solid #140D0A;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 3;


/* Line 6 */

width: 161px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 4px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 2;


/* Ellipse 6 */

width: 15px;
height: 15px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 3px solid #140D0A;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 1;


/* Line 5 */

width: 55px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 4px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;
z-index: 0;


/* Frame 391 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 258px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Preço: 0,02 - 12,30 ETH */

width: 208px;
height: 20px;

/* Body/15 Regular · lh 16

combo:15|Regular|16px|0% | usos: 66
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Apply Button */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 12px;

width: 92px;
height: 36px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aplicar */

width: 68px;
height: 20px;

/* Body Large/16 Bold · lh 20

combo:16|Bold|20px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Network Filter */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 270px;
height: 148px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Rede */

width: 44px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* List */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 12px;

width: 270px;
height: 120px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 392 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 73px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (119) */

margin: 0 auto;
width: 46px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 393 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 64px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (78) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 394 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 258px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Ethereum
Polygon
Solana */

margin: 0 auto;
width: 55px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* (86) */

margin: 0 auto;
width: 37px;
height: 40px;

/* Body/15 Regular · lh 40

combo:15|Regular|40px|0% | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 40px;
/* identical to box height, or 267% */
text-align: right;

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

# Desktop / Perfil do Colecionador
## Perfil (frame inteiro)
/* Top */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 803px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header With Divider

Header Row plus the hairline divider beneath it. Used on the five sites that already show the divider: the home, collector profile and wallets screens, and inside Marketplace Page, which the two auth screens instance. Market screens intentionally use a bare Header Row with no divider.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 58px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Active Underline */

width: 58px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 1 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Body */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 28px;

width: 1200px;
height: 726px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Account Sidebar */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 0px;

width: 310px;
height: 407px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 457 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;
gap: 10px;

width: 129px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Meu perfil */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 459 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px 16px;

width: 310px;
height: 45px;

border-left: 6px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 458 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

width: 278px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* User */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 16.67%;
right: 16.67%;
top: 8.33%;
bottom: 8.33%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 136px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 460 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Iconly/Light-Outline/Location */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Location */

position: absolute;
width: 13.75px;
height: 16.25px;
left: 3.33px;
top: 1.67px;



/* Fill 1 */

position: absolute;
left: 37.5%;
right: 35.41%;
top: 29.17%;
bottom: 43.75%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Path */

position: absolute;
left: 43.75%;
right: 41.66%;
top: 35.42%;
bottom: 50%;



/* Path */

position: absolute;
left: 37.5%;
right: 35.41%;
top: 29.17%;
bottom: 43.75%;



/* Group 5 */

position: absolute;
width: 13.75px;
height: 16.25px;
left: 3.33px;
top: 1.67px;



/* Clip 4 */

position: absolute;
left: 16.67%;
right: 14.59%;
top: 8.33%;
bottom: 10.42%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 3 */

position: absolute;
left: 16.67%;
right: 14.58%;
top: 8.33%;
bottom: 10.42%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Path */

position: absolute;
left: 22.92%;
right: 20.83%;
top: 14.58%;
bottom: 16.68%;



/* Path */

position: absolute;
left: 16.67%;
right: 14.58%;
top: 8.33%;
bottom: 10.42%;



/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 82px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 461 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* shopping 1 */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 0.01%;
bottom: 0%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 82px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 462 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* heart 1 */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 5.47%;
bottom: 5.56%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 163px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 463 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Activity */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Activity */

position: absolute;
width: 14.35px;
height: 14.4px;
left: 1.84px;
top: 1.76px;



/* Stroke 1 */

position: absolute;
left: 28.82%;
right: 32.28%;
top: 41.11%;
bottom: 38.11%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 2 */

position: absolute;
left: 73.94%;
right: 10.05%;
top: 9.79%;
bottom: 74.19%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 4 */

position: absolute;
left: 10.21%;
right: 12.71%;
top: 12.72%;
bottom: 10.19%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 64px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 464 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Download */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Download */

position: absolute;
width: 13.88px;
height: 13.96px;
left: 2.06px;
top: 2.06px;



/* Stroke 1 */

position: absolute;
left: 47.41%;
right: 48.42%;
top: 11.46%;
bottom: 38.37%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 37.35%;
right: 38.35%;
top: 49.43%;
bottom: 38.37%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 4 */

position: absolute;
left: 11.46%;
right: 11.46%;
top: 30.24%;
bottom: 11.01%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 154px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 465 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Danger Triangle */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Danger Triangle */

position: absolute;
width: 14.25px;
height: 13.5px;
left: 1.88px;
top: 2.25px;



/* Stroke 3 */

position: absolute;
left: 10.42%;
right: 10.42%;
top: 12.5%;
bottom: 12.5%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 47.92%;
right: 47.92%;
top: 35.42%;
bottom: 48.35%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 15 */

position: absolute;
left: 47.92%;
right: 47.92%;
top: 64.15%;
bottom: 31.69%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 64px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 2 */

width: 310px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Frame 38 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 8px;

width: 310px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 16.28px;
height: 15.42px;
left: 1.88px;
top: 2.29px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Sair */

width: 37px;
height: 15px;

/* Body/15 Bold · lh 15

combo:15|Bold|15px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Profile Form */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 862px;
height: 726px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Perfil do colecionador */

width: 212px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Fields */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 862px;
height: 285px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Field Row 1 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 862px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Display Name Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 16 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de exibição */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 59 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 454 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Username Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Label */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 453 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de usuário */

width: 136px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 452 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 10px;

width: 14px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* * */

margin: 0 auto;
width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rectangle 60 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Field Row 2 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 862px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Bio Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 17 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 69px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* E-mail */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* ENS Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 455 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 91px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome ENS */

width: 73px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* ENS Input */

width: 417px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 67 */

box-sizing: border-box;

position: absolute;
width: 78px;
height: 40px;
left: 0px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;


/* .eth */

position: absolute;
width: 37px;
height: 15px;
left: 10px;
top: 13px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Arrow-Down */

position: absolute;
left: 12.71%;
right: 82.49%;
top: 25%;
bottom: 25%;



/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Rectangle 61 */

box-sizing: border-box;

position: absolute;
width: 329px;
height: 40px;
left: 88px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;


/* Field Row 3 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 862px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Website Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 18 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 172px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Apelido da carteira */

width: 172px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 62 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Avatar Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 75px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Label */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 55px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Avatar */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Avatar Controls */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 251px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 456 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 24px;

width: 251px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 32 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 12px;
gap: 10px;

width: 50px;
height: 50px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 25px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Image 2 */

width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Image 2 */

position: absolute;
width: 18.5px;
height: 18.5px;
left: 2.75px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 11.46%;
right: 11.46%;
top: 11.46%;
bottom: 11.46%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 3 */

position: absolute;
left: 29.49%;
right: 55.84%;
top: 29.26%;
bottom: 56.06%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 5 */

position: absolute;
left: 18.61%;
right: 12%;
top: 49.71%;
bottom: 21.36%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Frame 33 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 177px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

width: 98px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Remover */

width: 59px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Alterar */

position: absolute;
width: 59px;
height: 16px;
left: 25px;
top: 12px;

/* Body/14 Bold · lh 16

combo:14|Bold|16px|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Change Password */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 862px;
height: 289px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Alterar senha */

width: 125px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Current Password Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 417px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Senha atual */

width: 100px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Password Input

Bordered password field with a visibility toggle. Used in the Change Password block on the collector profile screen. It has no text child: to give the three fields placeholder or value text, add a TEXT node plus a TEXT component property here rather than detaching an instance.
*/

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px 16px;
gap: 10px;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Light-Outline/Hide */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Hide */

position: absolute;
width: 16.67px;
height: 14.39px;
left: 1.67px;
top: 3.33px;



/* Fill 1 */

position: absolute;
left: 33.69%;
right: 37.58%;
top: 36.34%;
bottom: 34.93%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Fill 3 */

position: absolute;
left: 49.24%;
right: 33.94%;
top: 51.88%;
bottom: 31.29%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 7 */

position: absolute;
width: 16.09px;
height: 14.1px;
left: 1.67px;
top: 3.85px;



/* Clip 6 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 5 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 10 */

position: absolute;
width: 13.28px;
height: 11.95px;
left: 7.26px;
top: 7.28px;



/* Clip 9 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 8 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 13 */

position: absolute;
width: 17.27px;
height: 17.27px;
left: 2.8px;
top: 3.33px;



/* Clip 12 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 11 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* New Password Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 417px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Nova senha */

width: 91px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Password Input

Bordered password field with a visibility toggle. Used in the Change Password block on the collector profile screen. It has no text child: to give the three fields placeholder or value text, add a TEXT node plus a TEXT component property here rather than detaching an instance.
*/

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px 16px;
gap: 10px;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Light-Outline/Hide */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Hide */

position: absolute;
width: 16.67px;
height: 14.39px;
left: 1.67px;
top: 3.33px;



/* Fill 1 */

position: absolute;
left: 33.69%;
right: 37.58%;
top: 36.34%;
bottom: 34.93%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Fill 3 */

position: absolute;
left: 49.24%;
right: 33.94%;
top: 51.88%;
bottom: 31.29%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 7 */

position: absolute;
width: 16.09px;
height: 14.1px;
left: 1.67px;
top: 3.85px;



/* Clip 6 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 5 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 10 */

position: absolute;
width: 13.28px;
height: 11.95px;
left: 7.26px;
top: 7.28px;



/* Clip 9 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 8 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 13 */

position: absolute;
width: 17.27px;
height: 17.27px;
left: 2.8px;
top: 3.33px;



/* Clip 12 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 11 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Confirm Password Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 417px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Confirmar nova senha */

width: 181px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Password Input

Bordered password field with a visibility toggle. Used in the Change Password block on the collector profile screen. It has no text child: to give the three fields placeholder or value text, add a TEXT node plus a TEXT component property here rather than detaching an instance.
*/

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px 16px;
gap: 10px;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Light-Outline/Hide */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Hide */

position: absolute;
width: 16.67px;
height: 14.39px;
left: 1.67px;
top: 3.33px;



/* Fill 1 */

position: absolute;
left: 33.69%;
right: 37.58%;
top: 36.34%;
bottom: 34.93%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Fill 3 */

position: absolute;
left: 49.24%;
right: 33.94%;
top: 51.88%;
bottom: 31.29%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 7 */

position: absolute;
width: 16.09px;
height: 14.1px;
left: 1.67px;
top: 3.85px;



/* Clip 6 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 5 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 10 */

position: absolute;
width: 13.28px;
height: 11.95px;
left: 7.26px;
top: 7.28px;



/* Clip 9 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 8 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 13 */

position: absolute;
width: 17.27px;
height: 17.27px;
left: 2.8px;
top: 3.33px;



/* Clip 12 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 11 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Save Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 131px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Salvar */

width: 51px;
height: 16px;

/* Body/14 Bold · lh 16

combo:14|Bold|16px|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

# Desktop / Carteiras
## Carteiras (frame inteiro)
/* Top */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 1200px;
height: 803px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Header With Divider

Header Row plus the hairline divider beneath it. Used on the five sites that already show the divider: the home, collector profile and wallets screens, and inside Marketplace Page, which the two auth screens instance. Market screens intentionally use a bare Header Row with no divider.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Header Row

Desktop header row, 1200 wide: KURIO wordmark, 4-item nav with one active item, search, cart with count badge, and the sign-in button. Set Active to match the screen (Home on Início/Entrar/Criar conta/Perfil do colecionador/Carteiras, Market on the four Mercado-flow screens). Badge Count is the cart item count. Drop at index 0 of the screen Top or Header frame with FILL width and HUG height. The hairline rule under the header belongs to the host Header frame, not to this component.
*/

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Logo */

width: 160px;
height: 34.3px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* KURIO Wordmark */

position: absolute;
width: 48px;
height: 18px;
left: 0px;
top: 8.15px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;



/* Nav */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 40px;

width: 401px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Nav Item */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 58px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Início */

width: 58px;
height: 21px;

/* Body Large/16 Bold · lh auto

combo:16|Bold|AUTO|0% | usos: 3
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 21px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Active Underline */

width: 58px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Mercado */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Criadores */

width: 87px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Aprenda */

width: 68px;
height: 21px;

/* Body Large/16 Regular · lh auto

combo:16|Regular|AUTO|0% | usos: 33
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 21px;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Header Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;

width: 207px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Search Icon */

width: 20px;
height: 20px;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Cart */

width: 31px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Cart Icon */

position: absolute;
left: 23.19%;
right: 65.22%;
top: 15.71%;
bottom: 15.71%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Badge */

position: absolute;
width: 16px;
height: 16px;
left: 63px;
top: 5.5px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 2px solid #140D0A;


/* Badge Count */

position: absolute;
width: 7px;
height: 13px;
left: 68px;
top: 7px;

/* Tiny/10 Medium

combo:10|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 13px;

/* Color/Ink */
color: #140D0A;



/* Login */

width: 100px;
height: 35px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Login Button */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 100px;
height: 35px;
left: 107px;
top: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 6px;


/* Login Button Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 82px;
height: 21px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 19.53px;
height: 18.5px;
left: 2.26px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Ink

#140D0A — vinculado à variável color/ink
*/
border: 1.5px solid #140D0A;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Entrar */

width: 58px;
height: 21px;

/* Body Large/16 Medium · lh auto

combo:16|Medium|AUTO|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 1 */

width: 1200px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Body */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 28px;

width: 1200px;
height: 726px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Account Sidebar */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 0px;

width: 310px;
height: 407px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 457 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;
gap: 10px;

width: 129px;
height: 36px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Meu perfil */

width: 109px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 459 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px 16px;

width: 310px;
height: 45px;

border-left: 6px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 458 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;

width: 278px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* User */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 16.67%;
right: 16.67%;
top: 8.33%;
bottom: 8.33%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 136px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 460 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Iconly/Light-Outline/Location */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Location */

position: absolute;
width: 13.75px;
height: 16.25px;
left: 3.33px;
top: 1.67px;



/* Fill 1 */

position: absolute;
left: 37.5%;
right: 35.41%;
top: 29.17%;
bottom: 43.75%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Path */

position: absolute;
left: 43.75%;
right: 41.66%;
top: 35.42%;
bottom: 50%;



/* Path */

position: absolute;
left: 37.5%;
right: 35.41%;
top: 29.17%;
bottom: 43.75%;



/* Group 5 */

position: absolute;
width: 13.75px;
height: 16.25px;
left: 3.33px;
top: 1.67px;



/* Clip 4 */

position: absolute;
left: 16.67%;
right: 14.59%;
top: 8.33%;
bottom: 10.42%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 3 */

position: absolute;
left: 16.67%;
right: 14.58%;
top: 8.33%;
bottom: 10.42%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Path */

position: absolute;
left: 22.92%;
right: 20.83%;
top: 14.58%;
bottom: 16.68%;



/* Path */

position: absolute;
left: 16.67%;
right: 14.58%;
top: 8.33%;
bottom: 10.42%;



/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 82px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 461 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* shopping 1 */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 0.01%;
bottom: 0%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 82px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 462 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* heart 1 */

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

position: absolute;
left: 0%;
right: 0%;
top: 5.47%;
bottom: 5.56%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 163px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 463 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Activity */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Activity */

position: absolute;
width: 14.35px;
height: 14.4px;
left: 1.84px;
top: 1.76px;



/* Stroke 1 */

position: absolute;
left: 28.82%;
right: 32.28%;
top: 41.11%;
bottom: 38.11%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 2 */

position: absolute;
left: 73.94%;
right: 10.05%;
top: 9.79%;
bottom: 74.19%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 4 */

position: absolute;
left: 10.21%;
right: 12.71%;
top: 12.72%;
bottom: 10.19%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 64px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 464 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Download */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Download */

position: absolute;
width: 13.88px;
height: 13.96px;
left: 2.06px;
top: 2.06px;



/* Stroke 1 */

position: absolute;
left: 47.41%;
right: 48.42%;
top: 11.46%;
bottom: 38.37%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 37.35%;
right: 38.35%;
top: 49.43%;
bottom: 38.37%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 4 */

position: absolute;
left: 11.46%;
right: 11.46%;
top: 30.24%;
bottom: 11.01%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 154px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 465 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 12px;

width: 310px;
height: 45px;


/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Danger Triangle */

width: 18px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Danger Triangle */

position: absolute;
width: 14.25px;
height: 13.5px;
left: 1.88px;
top: 2.25px;



/* Stroke 3 */

position: absolute;
left: 10.42%;
right: 10.42%;
top: 12.5%;
bottom: 12.5%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 3 */

position: absolute;
left: 47.92%;
right: 47.92%;
top: 35.42%;
bottom: 48.35%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Stroke 15 */

position: absolute;
left: 47.92%;
right: 47.92%;
top: 64.15%;
bottom: 31.69%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
border: 1.5px solid #B39463;


/* Profile Details
Wallets
Activity
Watchlist
Offers
Downloads
Support */

width: 64px;
height: 45px;

/* Body/15 Regular · lh 45

combo:15|Regular|45px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 45px;
/* identical to box height, or 300% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Line 2 */

width: 310px;
height: 0px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 0.3px solid #D28A4C;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Frame 38 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 16px;
gap: 8px;

width: 310px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Iconly/Curved/Logout */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Logout */

position: absolute;
width: 16.28px;
height: 15.42px;
left: 1.88px;
top: 2.29px;



/* Stroke 1 */

position: absolute;
left: 40.62%;
right: 9.2%;
top: 48.42%;
bottom: 47.41%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 3 */

position: absolute;
left: 78.6%;
right: 9.2%;
top: 38.35%;
bottom: 37.35%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 4 */

position: absolute;
left: 9.41%;
right: 31.83%;
top: 11.46%;
bottom: 11.46%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;
transform: matrix(-1, 0, 0, 1, 0, 0);


/* Sair */

width: 37px;
height: 15px;

/* Body/15 Bold · lh 15

combo:15|Bold|15px|0% | usos: 2
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Profile Form */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 862px;
height: 726px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Perfil do colecionador */

width: 212px;
height: 16px;

/* Body Large/16 Bold · lh 16

combo:16|Bold|16px|0% | usos: 58
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Fields */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 862px;
height: 285px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Field Row 1 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 862px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Display Name Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 16 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 159px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de exibição */

width: 145px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 59 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 454 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Username Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Label */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 453 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 150px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome de usuário */

width: 136px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 452 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 10px;

width: 14px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* * */

margin: 0 auto;
width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Rectangle 60 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Field Row 2 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 862px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Bio Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 17 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 69px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* E-mail */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* ENS Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 455 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 91px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Nome ENS */

width: 73px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* ENS Input */

width: 417px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 67 */

box-sizing: border-box;

position: absolute;
width: 78px;
height: 40px;
left: 0px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;


/* .eth */

position: absolute;
width: 37px;
height: 15px;
left: 10px;
top: 13px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;



/* Arrow-Down */

position: absolute;
left: 12.71%;
right: 82.49%;
top: 25%;
bottom: 25%;



/* Vector 37 (Stroke) */

position: absolute;
left: 21.88%;
right: 21.88%;
top: 38.54%;
bottom: 30.21%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;


/* Rectangle 61 */

box-sizing: border-box;

position: absolute;
width: 329px;
height: 40px;
left: 88px;
top: 0px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;


/* Field Row 3 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;

width: 862px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Website Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 79px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 18 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 172px;
height: 29px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Apelido da carteira */

width: 172px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* * */

width: 14px;
height: 29px;

/* Title/22 Regular

combo:22|Regular|15px|0% | usos: 32
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 29px;
/* identical to box height, or 132% */
text-align: right;

/* Text/Coral */
color: #F0805F;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 62 */

box-sizing: border-box;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Avatar Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 417px;
height: 75px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Label */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 55px;
height: 15px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Avatar */

width: 55px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Avatar Controls */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 251px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Frame 456 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 24px;

width: 251px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 32 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 12px;
gap: 10px;

width: 50px;
height: 50px;

/* Color/Surface Raised

#2F1D15 — vinculado à variável color/text-secondary
*/
background: #2F1D15;
/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 25px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Iconly/Curved/Image 2 */

width: 24px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Image 2 */

position: absolute;
width: 18.5px;
height: 18.5px;
left: 2.75px;
top: 2.75px;



/* Stroke 1 */

position: absolute;
left: 11.46%;
right: 11.46%;
top: 11.46%;
bottom: 11.46%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 3 */

position: absolute;
left: 29.49%;
right: 55.84%;
top: 29.26%;
bottom: 56.06%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Stroke 5 */

position: absolute;
left: 18.61%;
right: 12%;
top: 49.71%;
bottom: 21.36%;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1.5px solid #D28A4C;


/* Frame 33 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 177px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Rectangle 66 */

width: 98px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Remover */

width: 59px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Alterar */

position: absolute;
width: 59px;
height: 16px;
left: 25px;
top: 12px;

/* Body/14 Bold · lh 16

combo:14|Bold|16px|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Change Password */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

width: 862px;
height: 289px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Alterar senha */

width: 125px;
height: 16px;

/* Body Large/16 Medium · lh 16

combo:16|Medium|16px|0% | usos: 11
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 16px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Current Password Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 417px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Senha atual */

width: 100px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Password Input

Bordered password field with a visibility toggle. Used in the Change Password block on the collector profile screen. It has no text child: to give the three fields placeholder or value text, add a TEXT node plus a TEXT component property here rather than detaching an instance.
*/

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px 16px;
gap: 10px;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Light-Outline/Hide */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Hide */

position: absolute;
width: 16.67px;
height: 14.39px;
left: 1.67px;
top: 3.33px;



/* Fill 1 */

position: absolute;
left: 33.69%;
right: 37.58%;
top: 36.34%;
bottom: 34.93%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Fill 3 */

position: absolute;
left: 49.24%;
right: 33.94%;
top: 51.88%;
bottom: 31.29%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 7 */

position: absolute;
width: 16.09px;
height: 14.1px;
left: 1.67px;
top: 3.85px;



/* Clip 6 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 5 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 10 */

position: absolute;
width: 13.28px;
height: 11.95px;
left: 7.26px;
top: 7.28px;



/* Clip 9 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 8 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 13 */

position: absolute;
width: 17.27px;
height: 17.27px;
left: 2.8px;
top: 3.33px;



/* Clip 12 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 11 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* New Password Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 417px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Nova senha */

width: 91px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Password Input

Bordered password field with a visibility toggle. Used in the Change Password block on the collector profile screen. It has no text child: to give the three fields placeholder or value text, add a TEXT node plus a TEXT component property here rather than detaching an instance.
*/

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px 16px;
gap: 10px;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Light-Outline/Hide */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Hide */

position: absolute;
width: 16.67px;
height: 14.39px;
left: 1.67px;
top: 3.33px;



/* Fill 1 */

position: absolute;
left: 33.69%;
right: 37.58%;
top: 36.34%;
bottom: 34.93%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Fill 3 */

position: absolute;
left: 49.24%;
right: 33.94%;
top: 51.88%;
bottom: 31.29%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 7 */

position: absolute;
width: 16.09px;
height: 14.1px;
left: 1.67px;
top: 3.85px;



/* Clip 6 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 5 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 10 */

position: absolute;
width: 13.28px;
height: 11.95px;
left: 7.26px;
top: 7.28px;



/* Clip 9 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 8 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 13 */

position: absolute;
width: 17.27px;
height: 17.27px;
left: 2.8px;
top: 3.33px;



/* Clip 12 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 11 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Confirm Password Field */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 417px;
height: 67px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Confirmar nova senha */

width: 181px;
height: 15px;

/* Body/15 Regular · lh 15

combo:15|Regular|15px|0% | usos: 42
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 15px;
/* identical to box height, or 100% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Password Input

Bordered password field with a visibility toggle. Used in the Change Password block on the collector profile screen. It has no text child: to give the three fields placeholder or value text, add a TEXT node plus a TEXT component property here rather than detaching an instance.
*/

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px 16px;
gap: 10px;

width: 417px;
height: 40px;

/* Color/Border

#3F2319 — vinculado à variável color/border
*/
border: 1px solid #3F2319;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Iconly/Light-Outline/Hide */

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Hide */

position: absolute;
width: 16.67px;
height: 14.39px;
left: 1.67px;
top: 3.33px;



/* Fill 1 */

position: absolute;
left: 33.69%;
right: 37.58%;
top: 36.34%;
bottom: 34.93%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Fill 3 */

position: absolute;
left: 49.24%;
right: 33.94%;
top: 51.88%;
bottom: 31.29%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 7 */

position: absolute;
width: 16.09px;
height: 14.1px;
left: 1.67px;
top: 3.85px;



/* Clip 6 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 5 */

position: absolute;
left: 6.67%;
right: 26.31%;
top: 15.42%;
bottom: 25.84%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 10 */

position: absolute;
width: 13.28px;
height: 11.95px;
left: 7.26px;
top: 7.28px;



/* Clip 9 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 8 */

position: absolute;
left: 29.06%;
right: 15.6%;
top: 29.14%;
bottom: 21.08%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Group 13 */

position: absolute;
width: 17.27px;
height: 17.27px;
left: 2.8px;
top: 3.33px;



/* Clip 12 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Black

#000000 — vinculado à variável color/black
*/
background: #000000;


/* Fill 11 */

position: absolute;
left: 14.01%;
right: 14.01%;
top: 16.67%;
bottom: 11.36%;

/* Color/Secondary

#B39463 — vinculado à variável color/secondary
*/
background: #B39463;


/* Save Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 131px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 3px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Salvar */

width: 51px;
height: 16px;

/* Body/14 Bold · lh 16

combo:14|Bold|16px|0% | usos: 9
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

# Componentes compartilhados
## Footer

/* Footer

Desktop footer, 1200 wide: three feature medallions with a newsletter signup, the brand band with contact details, and four link columns with social and wallet chips. Drop as the last child of the screen with FILL width and HUG height. On screens with a modal scrim the footer must stay BELOW the scrim in paint order. Content is identical on every screen; no per-instance overrides expected.
*/

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 610px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 122 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 32px;
gap: 12px;

width: 1200px;
height: 250px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 100 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
padding: 0px;
gap: 28px;

width: 1154px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 22 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px;
gap: 10px;

margin: 0 auto;
width: 264.67px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Frame 92 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 232.67px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 91 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 74px;
height: 74px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 37px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Service mark W */

width: 15px;
height: 32px;

/* Heading/24 Bold

combo:24|Bold|AUTO|0% | usos: 15
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 32px;
/* identical to box height */
display: flex;
align-items: center;
text-align: center;

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Segurança da carteira */

width: 232.67px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Proteja sua carteira e colecione arte digital verificada com confiança. */

width: 204px;
height: 88px;

/* Body/14 Regular · lh 22

combo:14|Regular|22px|0% | usos: 37
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* or 157% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Rectangle 36 */

margin: 0 auto;
width: 202px;
height: 1px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
transform: rotate(-90deg);

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 21 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px 16px;
gap: 10px;

margin: 0 auto;
width: 264.67px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Frame 94 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 232.67px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 93 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 74px;
height: 74px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 37px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Service mark C */

width: 15px;
height: 32px;

/* Heading/24 Bold

combo:24|Bold|AUTO|0% | usos: 15
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 32px;
/* identical to box height */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Criadores em destaque */

width: 232.67px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede. */

width: 204px;
height: 88px;

/* Body/14 Regular · lh 22

combo:14|Regular|22px|0% | usos: 37
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* or 157% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Rectangle 38 */

margin: 0 auto;
width: 202px;
height: 1px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
transform: rotate(-90deg);

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Frame 20 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px;
gap: 10px;

margin: 0 auto;
width: 264.67px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Frame 96 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 232.67px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 95 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 74px;
height: 74px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 37px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Service mark D */

width: 15px;
height: 32px;

/* Heading/24 Bold

combo:24|Bold|AUTO|0% | usos: 15
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 32px;
/* identical to box height */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Alertas de lançamentos */

width: 232.67px;
height: 16px;

/* Body Large/17 Bold

combo:17|Bold|16px|0% | usos: 26
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 16px;
/* identical to box height, or 94% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado. */

width: 204px;
height: 88px;

/* Body/14 Regular · lh 22

combo:14|Regular|22px|0% | usos: 37
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* or 157% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Rectangle 39 */

margin: 0 auto;
width: 202px;
height: 1px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
transform: rotate(-90deg);

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Frame 99 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 16px;
gap: 12px;

margin: 0 auto;
width: 357px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Frame 102 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 325px;
height: 88px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Antecipe-se ao próximo lançamento */

width: 325px;
height: 32px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 101 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;

width: 325px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 98 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 12px 0px 12px 12px;
gap: 10px;

width: 325px;
height: 40px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;
box-shadow: 0px 0px 20px rgba(10, 6, 4, 0.45);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* digite seu e-mail... */

margin: 0 auto;
width: 169px;
height: 16px;

/* Body/14 Regular · lh 16

combo:14|Regular|16px|0% | usos: 62
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

/* Color/Secondary */
color: #B39463;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 97 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 4px 12px 16px;
gap: 10px;

margin: 0 auto;
width: 85px;
height: 40px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;
border-radius: 0px 6px 6px 0px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Enviar */

width: 65px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Ink */
color: #140D0A;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Get curated drops, creator stories, and collector rewards delivered to your inbo */

width: 325px;
height: 89px;

/* Caption/13 Regular · lh 22

combo:13|Regular|22px|0% | usos: 5
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 22px;
/* or 169% */

/* Text/Secondary */
color: #CFB28C;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 121 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1200px;
height: 360px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 120 */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 32px;
gap: 10px;

width: 1200px;
height: 88px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 119 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 92px;

width: 1136px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Logo */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 0px;
gap: 10px;

width: 210.67px;
height: 34px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* KURIO Wordmark */

width: 48px;
height: 18px;

/* Body/14 Bold · lh auto

combo:14|Bold|AUTO|10% | usos: 14
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.1em;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 126 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 210.67px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* Built for collectors,
creators, and culture */

width: 219px;
height: 44px;

/* Body/14 Regular · lh 22

combo:14|Regular|22px|0% | usos: 37
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* or 157% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 124 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 210.67px;
height: 22px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* contato@email.com */

width: 143px;
height: 22px;

/* Body/14 Regular · lh 22

combo:14|Regular|22px|0% | usos: 37
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* identical to box height, or 157% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 125 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 228px;
height: 22px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* +55 11 4002 8922 */

width: 135px;
height: 22px;

/* Body/14 Regular · lh 22

combo:14|Regular|22px|0% | usos: 37
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
/* identical to box height, or 157% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 118 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 6px;

width: 1200px;
height: 272px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 117 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 32px;
gap: 10px;

width: 1200px;
height: 236px;

/* Color/Surface Card

#241612 — vinculado à variável color/text-primary
*/
background: #241612;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 116 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 124px;

width: 1136px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 103 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 178.67px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Meu perfil */

width: 178.67px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* My Profile
My Collection
Activity
Creator Studio
Watchlist */

width: 178.67px;
height: 150px;

/* Body/14 Regular · lh 30

combo:14|Regular|30px|0% | usos: 20
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 30px;
/* or 214% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 104 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 178.67px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Central de ajuda */

width: 178.67px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Help Center
How to Buy NFTs
Wallet & Security
Marketplace Policy
Report an I */

width: 178.67px;
height: 150px;

/* Body/14 Regular · lh 30

combo:14|Regular|30px|0% | usos: 20
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 30px;
/* or 214% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 105 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 178.67px;
height: 174px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* Coleções */

width: 178.67px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Digital Art
Photography
Music
3D Art
Utility */

width: 178.67px;
height: 150px;

/* Body/14 Regular · lh 30

combo:14|Regular|30px|0% | usos: 20
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 30px;
/* or 214% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 115 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;

width: 228px;
height: 152px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Frame 114 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;

width: 190px;
height: 66px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Redes sociais */

width: 190px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 113 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

width: 190px;
height: 30px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Frame 108 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px 12px;
gap: 10px;

width: 30px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Facebook */

width: 8px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 109 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px;
gap: 10px;

width: 30px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Instagram */

width: 16px;
height: 16px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 110 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 10px;

width: 30px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Twitter */

width: 16px;
height: 13px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 111 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 10px;

width: 30px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Linkedin */

width: 16px;
height: 15.33px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Frame 112 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 4px 8px 6px;
gap: 10px;

width: 30px;
height: 30px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
border: 1px solid #D28A4C;
border-radius: 4px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Union */

width: 18.67px;
height: 13.98px;

/* Color/Primary

#D28A4C — vinculado à variável color/primary
*/
background: #D28A4C;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Vector */

box-sizing: border-box;

position: absolute;
left: 20%;
right: 17.78%;
top: 26.67%;
bottom: 26.73%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
border: 4.23602px solid #F5F1EB;


/* Vector */

position: absolute;
left: 43.33%;
right: 35.93%;
top: 39.69%;
bottom: 39.57%;

/* Color/Foreground

#F5F1EB — vinculado à variável color/background
*/
background: #F5F1EB;
border-radius: 2.11801px;


/* Frame 107 */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 228px;
height: 54px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Carteiras compatíveis */

width: 228px;
height: 16px;

/* Body Large/18 Bold · lh 16

combo:18|Bold|16px|0% | usos: 95
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 16px;
/* identical to box height, or 89% */

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Frame 106 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 0px 8px 8px;
gap: 10px;

width: 228px;
height: 26px;

/* Color/Surface Dark

#38220F — vinculado à variável color/surface-dark
*/
background: #38220F;
/* Color/Border Soft

#55321F — vinculado à variável color/border-soft
*/
border: 1px solid #55321F;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Supported wallet brands */

width: 215px;
height: 12px;

/* Tiny/9 Bold

combo:9|Bold|AUTO|0.1px | usos: 7
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
font-size: 9px;
line-height: 12px;
/* identical to box height */
letter-spacing: 0.1px;

/* Text/Accent */
color: #E89B55;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* © 2026 Kurio. Propriedade digital para todos. */

width: 1200px;
height: 30px;

/* Body/14 Regular · lh 30

combo:14|Regular|30px|0% | usos: 20
*/
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 30px;
/* identical to box height, or 214% */
text-align: center;

/* Color/Foreground */
color: #F5F1EB;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
