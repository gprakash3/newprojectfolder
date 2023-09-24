const student = {
    name:"Ram",
    Roll_number : "12",
    class: "2",
    detail(){
        console.log(this.name + 'is student of class ' + this.class+' whose roll number is '+ this.Roll_number);
    }
}
student.detail();