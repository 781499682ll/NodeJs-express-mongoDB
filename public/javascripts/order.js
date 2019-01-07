jQuery(($)=>{
    $('#insert').on('click',async ()=>{
        let stu_id = $('#stu_id').val();
        let stu_name = $('#stu_name').val();
        let stu_gender = $('#stu_gender').val();
        let stu_skill = $('#stu_skill').val();
        let stu_hobby = $('#stu_hobby').val();
        console.log(stu_id);
        
        var r_data = await insertUser(stu_id,stu_name,stu_gender,stu_skill,stu_hobby);
        if(r_data == 'success'){
            alert('插入成功');
            location.href = '../dashboard.html';
        }else{
            alert(r_data);
            $('#stu_id').val('');
        }
        
    })
    
    let insertUser = (stu_id,stu_name,stu_gender,stu_skill,stu_hobby) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/insertUser",
                data:{
                    stu_id :stu_id,
                    stu_name :stu_name,
                    stu_gender :stu_gender,
                    stu_skill :stu_skill,
                    stu_hobby :stu_hobby
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
})