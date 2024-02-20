import axios from "axios";

export class FetchUsers{

    static TURL="https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails";
    static SURL="https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/student-teacher";

    static getAllStudent(){
        let dataUrl=this.SURL;
       return axios.get(dataUrl);
    }

    static getAllTeachers(){
        let dataUrl=this.TURL;
        return axios.get(dataUrl);
     }

    static getStudent(userId){
        let dataURL=`${this.SURL}/${userId}`
        return axios.get(dataURL);
    }

    static CreateStudent(user) {
        return axios.post(this.SURL,user);
    }

    static getTeacher(userId){
        let dataURL=`${this.TURL}/${userId}`
        return axios.get(dataURL);
    }

    static CreateTeacher(user) {
        return axios.post(this.TURL,user);
    }

    static EditTeacher(user,userId) {
        let dataURL=`${this.TURL}/${userId}`;
        return axios.put(dataURL,user);
    }

    static EditStudent(user,userId) {
        let dataURL=`${this.SURL}/${userId}`;
        return axios.put(dataURL,user);
    }

    static DeleteStudent(userId){
        let dataURL=`${this.SURL}/${userId}`;
        return axios.delete(dataURL);
    }

    static DeleteTeacher(userId){
        let dataURL=`${this.TURL}/${userId}`;
        return axios.delete(dataURL);
    }

    static getStaffAdvisor(Id){
        let dataURL=`${this.TURL}/${Id}`; 
        return axios.get(dataURL);
    }
}