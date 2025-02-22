const { readFileSync, writeFileSync, existsSync } = require("fs");

interface DataProps {
    id?: number,
    name: string
    nomor: string
}

interface MessageProps {
    message: string
    data?: DataProps
}

const readJson = (): DataProps[] => {
    if(existsSync("./data.json")) {
        return JSON.parse(readFileSync("./data.json", "utf-8"));
    } else {
        return [];
    }
}

const writeJson = (newData: DataProps): 
{ message: string, data: DataProps } => {
    const data: DataProps[] = readJson();
    data.push({id: data.length + 1, ...newData});
    writeFileSync("./data.json", JSON.stringify(data), "utf-8");
    return { message: "Data berhasil ditambahkan", data: newData };
}

const updateJson = (id: number, newData: DataProps): MessageProps => {
    const data: DataProps[] = readJson();
    const index: number = data.findIndex(item => item.id === id);
    if(index !== -1) {
        data[index] = {id,...newData};
        writeFileSync("./data.json", JSON.stringify(data), "utf-8");
        return { message: "Data berhasil diupdate", data: newData };
    } else {
        return { message: "Data tidak ditemukan" };
    }
}

const deleteJson = (id: number): MessageProps => {
    const data: DataProps[] = readJson();
    const index: number = data.findIndex(item => item.id === id);
    if(index !== -1) {
        data.splice(index, 1);
        writeFileSync("./data.json", JSON.stringify(data), "utf-8");
        return { message: "Data berhasil dihapus" };
    } else {
        return { message: "Data tidak ditemukan" };
    }
}

export { readJson, writeJson, updateJson, deleteJson };