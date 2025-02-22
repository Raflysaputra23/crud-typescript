import { readJson, writeJson, updateJson, deleteJson } from "./utils/json.js";
import menu from "./utils/menu.js";
import question from "./utils/question.js";

let pilihan: string = "y";

(async() => {
    let pilihan = await question("Pilih menu:\n1. Tambah Data\n2. Ubah Data\n3. Hapus Data\n4. Lihat Data\nPilihan: ");
    await menu(pilihan);
})()