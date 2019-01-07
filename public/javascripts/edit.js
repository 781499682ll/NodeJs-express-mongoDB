jQuery(($) => {
    let stu_id = decodeURI(location.search.slice(8));
    console.log(stu_id);
    //请求数据渲染页面
    let getUserList = (stu_id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                data: {
                    stu_id: stu_id
                },
                url: "http://localhost:3000/setting/findUser",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    //发送请求修改页面
    let editUser = (stu_id,stu_name,stu_gender,stu_skill,stu_hobby) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                data:{
                    stu_id :stu_id,
                    stu_name :stu_name,
                    stu_gender :stu_gender,
                    stu_skill :stu_skill,
                    stu_hobby :stu_hobby
                },
                url: "http://localhost:3000/setting/editUser",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
        (async () => {
            let data = await getUserList(stu_id);
            console.log(data);
            let html = data.map(function (item) {
                // console.log(item.stu_id);

                return `<div class="form-row">
                <div class="form-group col-md-12">
                    <label for="inputCity">学号</label>
                    <input type="text" class="form-control" id="stu_id" value=${item.stu_id} readonly="readonly">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">姓名</label>
                    <input type="text" class="form-control" id="stu_name" value=${item.stu_name}>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword4">性别</label>
                    <input type="text" class="form-control" id="stu_gender" value=${item.stu_gender}>
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">特长</label>
                <input type="text" class="form-control" id="stu_skill" value=${item.stu_skill}>
            </div>
            <div class="form-group">
                <label for="inputAddress2">爱好</label>
                <input type="text" class="form-control" id="stu_hobby" value=${item.stu_hobby}>
            </div>
            <input type="button" class="btn btn-primary" value="修改" id="edit"/>`
            }).join('');
            $('main').html(html)

            //点击修改按钮时获取数据，并发送请求修改数据
            $('#edit').on('click', async () => {
                let stu_id = $('#stu_id').val();
                let stu_name = $('#stu_name').val();
                let stu_gender = $('#stu_gender').val();
                let stu_skill = $('#stu_skill').val();
                let stu_hobby = $('#stu_hobby').val();
                console.log(stu_id);

                var e_data = await editUser(stu_id, stu_name, stu_gender, stu_skill, stu_hobby);
                if(e_data == 'success'){
                    alert('修改成功');
                    location.href = '../dashboard.html';
                }else{
                    return
                }
                
            })
        })();
})