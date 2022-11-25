const Pool =require ('../config/db')

// const selectEmployee = () => {
//     return Pool.query(`SELECT * FROM employee`);
// }

const selectEmployee = ({limit,offset,sort,sortby,search}) => {
    console.log(limit,offset,sort,sortby)
    return Pool.query(
      `SELECT employee.id,employee.fullname,employee.job_desk,employee.domisili,employee.tempat_kerja,employee.description,employee.skill,employee.working_experince,employee.portofolio FROM employee WHERE (employee.fullname) ILIKE ('%${search}%') ORDER BY employee.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `
    );
  };
  

const selectEmployeeDetail = (id) => {
    return Pool.query(`SELECT employee.id,employee.fullname,employee.job_desk,employee.domisili,employee.tempat_kerja,employee.description,employee.skill,employee.working_experince,employee.portofolio FROM employee WHERE employee.id='${id}'`);
}


const insertEmployee = (data) => {
    const {id,fullname,job_desk,domisili,tempat_kerja,description,skill,working_experince,portofolio} = data;
    return Pool.query(`INSERT INTO employee(id,fullname,job_desk,domisili,tempat_kerja,description,skill,working_experince,portofolio) VALUES (${id},'${fullname}','${job_desk}','${domisili}','${tempat_kerja}','${description}','${skill}','${working_experince}','${portofolio}')`);

}

const updateEmployee = (id,data) => {
    const {fullname,job_desk,domisili,tempat_kerja,description,skill,working_experince,portofolio} = data;
    return Pool.query(`UPDATE employee SET fullname='${fullname}',job_desk='${job_desk}',domisili='${domisili}',tempat_kerja='${tempat_kerja}',description='${description}',skill='${skill}',working_experince='${working_experince}',portofolio='${portofolio}' WHERE id='${id}'`);
}

const deleteEmployee = id => {
    return Pool.query(`DELETE FROM employee where id ='${id}'`);
}

module.exports = {selectEmployee, insertEmployee, updateEmployee, deleteEmployee,selectEmployeeDetail}
  