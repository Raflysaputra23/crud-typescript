import { deleteJson, readJson, updateJson, writeJson } from "./json";
import question from "./question";


const menu = async (pilihan: string) => {
    const menus = ["1", "2", "3", "4"];
    while(!menus.includes(pilihan)) {
        console.log("Menu tidak ditemukan!");
        pilihan = await question("Pilih menu:\n1. Tambah Data\n2. Ubah Data\n3. Hapus Data\n4. Lihat Data\nPilihan: ");
    }
    
    switch(pilihan) {
        case "1": {
            const name = await question("Masukkan nama: ");
            const nomor = await question("Masukkan nomor: ");
            const { message, data } = writeJson({name, nomor});
            let template = `
Nama: ${data.name}
Nomor: ${data.nomor}
Pesan: ${message}
            `;
            console.log(template);
            break;
        }
        case "2": {
            const id = await question("Masukkan id: ");
            const name = await question("Masukkan nama: ");
            const nomor = await question("Masukkan nomor: ");
            const { message, data = false } = updateJson(Number(id), {name, nomor});
            let template = ``;
            if(data) {
                template = `
Nama: ${data.name}
Nomor: ${data.nomor}
Pesan: ${message}
                `;
            } else {
                template = `Pesan: ${message}`;
            }
            console.log(template);
            break;
        }
        case "3": {
            const id = await question("Masukkan id: ");
            const { message } = deleteJson(+id);
            let template = `Pesan: ${message}`;
            console.log(template);
            break;
        }
        case "4": {
            const data = readJson();
            let template = `Data Mahasiswa:\n\n`;
            data.map((item) => {
                template += `
ID: ${item.id}
Nama: ${item.name}
Nomor: ${item.nomor}
                `
            })
            console.log(template);
            break;
        }
    }
    pilihan = await question("Keluar (y/n)? ");
    if(pilihan === "y") {
        process.exit(0);
    } else {
        pilihan = await question("Pilih menu:\n1. Tambah Data\n2. Ubah Data\n3. Hapus Data\n4. Lihat Data\nPilihan: ");
        await menu(pilihan);
    }
}

export default menu;