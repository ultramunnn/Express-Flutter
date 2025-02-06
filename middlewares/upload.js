//Mengimpor modul multer untuk menangani upload file
const multer = require('multer');

//Mengimpor modul path untuk manipulasi path file
const path = require('path');

//Mengimpor modul crypto untuk menghsilkan hash
const crypto = require('crypto');

//Ekstensi gambar yang diizinkan 
const allowedExtension = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

//Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
    
    //Menentukan direktori tujuan upload
    destination: (req, file, cb)=>{
        cb(null, 'uploads/'); //Mengarahkan file yang diupload ke folder 'uploads/'

    },
    //Menentukan nama file yang disimpan 
    filename: (req, file, cb) => {
       
        //Menghasilkan hash unik untuk nama file 
        const fileHash =crypto.randomBytes(16).toString('hex');
       
        //Mengambil extensi file dari nama file asli
        const ext = path.extname(file.originaname).toLowerCase();
       
        //Menyusun nama file baru dengan hash dan ekstensi
        cb(null, `${fileHash}${ext}`);
    },
});

//Filter file multer
const fileFilter = (req, file, cb)=> {
    
    //Mengambil ekstensi file dari nama file asli 
    const ext = path.extnamea(file.originaname).toLowerCase();

    //Memeriksa apakah ekstensi file termasuk dalam daftar ekstensi yang diizinkan
    if (allowedExtension.includes(ext)){
        cb(null, true); //Jika ekstensi diizinkan, lanjutkan dengan upload
    } else {
        //Jika ekstensi tidak diizinkan, batalkan upload dan kirimkan error
        cb(new Error('Ekstensi gambar tidak valid'), false);
    }
};

//Konfigurasi upload multer 
const upload = multer({
    storage :storage,                   // Menggunakkan konfigurasi penyimpanan yang telah ditentukan
    fileFilter : fileFilter,            // Menggunakkan filter file yang telah ditentukan
    limits : {fileSize: 5 *1024 *1024}  // Membatasi ukuran file maksimum hingga 5 MB
});

// Mengekspor konfigurasi upload agar dapat digunakan di tempat lain
module.exports = upload;

