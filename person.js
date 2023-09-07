// 1. set default value = fullName = "unknown", age = 25, isMale = false,
const Person = (
  fullName = "unknown",
  age = 25,
  isMale = false,
  avatar = ""
) => {
  // ternary operator, menggantikan if-else
  const info = () => {
    // 2. tampilkan full name, sex dan age
    let sex = isMale ? "Male" : "Female";
    return `Full Name: ${fullName}, Sex: ${sex}, Age: ${age}`;
  };

  return {
    // 3. kembalikan nilai info diatas
    get getInfo() {
      return info();
    },

    // 4. kembalikan nilai info diatas
    toString() {
      return info();
    },

    // 5. kembalikan usia sekarang ditambah dengan tahun inputan user
    addAge(yearsToAdd) {
      age += yearsToAdd;
      return age;
    },

    // 6. fungsi yang mengeset usia yang baru
    setAge(newAge) {
      age = newAge;
    },

    // 7. fungsi yang mengeset nama yang baru
    rename(newName) {
      fullName = newName;
    },

    // 8. kembalikan semua nilai dengan shorthand property
    fullName,
    age,
    isMale,
    avatar,
  };
};

// 9. export objek person sebagai sebuah modul
export default Person;
