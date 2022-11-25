const Pool =require ('../config/db')

const selectWorkingExperince = () => {
    return Pool.query(`SELECT * FROM working_experince`);
}

const insertWorkingExperince = (data) => {
    const {id,posisi,nama_perusahaan,description,bulan_tahun} = data;
    return Pool.query(`INSERT INTO working_experince(id,posisi,nama_perusahaan,description,bulan_tahun) VALUES (${id},'${posisi}','${nama_perusahaan}','${description}','${bulan_tahun}')`);

}

const updateWorkingExperince = (id,data) => {
    const {posisi,nama_perusahaan,description,bulan_tahun} = data;
    return Pool.query(`UPDATE working_experince SET posisi='${posisi}',nama_perusahaan='${nama_perusahaan}',description='${description}',bulan_tahun='${bulan_tahun}' WHERE id='${id}'`);
}

const deleteWorkingExperince = id => {
    return Pool.query(`DELETE FROM working_experince where id ='${id}'`);
}

module.exports = {selectWorkingExperince, insertWorkingExperince, updateWorkingExperince, deleteWorkingExperince}