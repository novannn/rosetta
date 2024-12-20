function validateForm(event) {
    event.preventDefault(); // Mencegah submit form default
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("suggestion").value.trim();
  
    if (!name || !email || !message) {
      alert("Mohon isi semua field!");
    } else {
      alert("Form berhasil diisi!");
      clearForm(); // Panggil fungsi untuk menghapus form
    }
  }
  
  function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("suggestion").value = "";
  }
  