export async function loadFonts(): Promise<void>{
const titleFont = new FontFace('Nos', 'url(assets/font/Nos.ttf)');
await titleFont.load();
document.fonts.add(titleFont);
const basicFont = new FontFace('stat', 'url(assets/font/stat.ttf)');
await basicFont.load();
document.fonts.add(basicFont);
const outfitFont = new FontFace('Outfit', 'url(assets/font/Outfit.ttf)');
await outfitFont.load();
document.fonts.add(outfitFont);
}
