function cleanLine(line){
    // Eliminar tabulaciones, más de dos espacios, EOL y retorno
    let clean_line = line.replace(/(\r|\s{2,}|;.*)+/g,'');
    // For minify html too
    clean_line.replace(/>\s+</,'><');
    return clean_line;
}