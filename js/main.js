class Student {
    constructor(name,address){
        this.name = name;
        this.address = address;
    }
}

class StudentList {
    constructor(){
        this.students = [];
    }

    addStudent(name,address){
        var student = new Student(name,address);
        this.students.push(student);
    }

    deleteStudent (index){
        this.students.splice(index,1);
        this.displayStudent();
    }

    updateStudent(index,name,address){
        if(index >= 0 && index < this.students.length){
            var student = this.students[index];
            student.name = name;
            student.address = address;
        }
   
    }
    displayStudent (){
        var studentListTable = document.getElementById("student-list");
        
        studentListTable.innerHTML = '';

        this.students.forEach((student,index)=>{
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.address}</td>
                <td>
                    <button class='delete' data-index = "${index}">Delete</button>
                    <button class='update' data-index = "${index}">Update</button>
                </td>
            `;

            var deleteButton = row.querySelector('.delete');
            deleteButton.addEventListener("click",()=>{
                this.deleteStudent(index);
            });

            var updateButton = row.querySelector('.update');
            updateButton.addEventListener("click",()=>{
                const newName = prompt("Enter your new name",student.name);
                if(newName !== null){
                    const newAddress = prompt("Enter Your new Address",student.address);
                    if(newAddress !== null){
                        this.updateStudent(index,newName,newAddress);
                        this.displayStudent();
                    }
                }
            });
            studentListTable.appendChild(row);

        });

        
    }
}

var studentList = new StudentList();
function displayDom (){
    var studentName = document.getElementById("studentName");
    var studentAddress  = document.getElementById("studentAddress");
    const name = studentName.value.trim();
    const address = studentAddress.value.trim();
    if(name && address){
        studentList.addStudent(name,address);
        studentList.displayStudent();
        studentName.value = '';
        studentAddress.value = ''
    }
}
var addStudent = document.getElementById("addStudent");
addStudent.addEventListener("click",displayDom);
    studentList.displayStudent();