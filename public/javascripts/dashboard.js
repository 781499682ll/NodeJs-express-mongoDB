$(async () => {
    // //判断是否登录成功
    let autologin = (token)=>{
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/autologin",
                headers:{
                    token:token
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    var checkStatus = await autologin(localStorage.getItem('token'));
    if(checkStatus){

    
    


    // var user = Cookie.getCookie('username');
    // console.log(user);
    // if(user.length>0){}

    //发送请求，并渲染页面
    let getUserList = (stu_id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
                data:{
                    stu_id:stu_id
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    let deleteuser = (del_id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/removeUser",
                data:{
                    stu_id:del_id
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
        async function render(stu_id) {
            let data = await getUserList(stu_id);
            console.log(data);
            let html = data.map((item, index) => {
                return `
                <tr>
                    <td><img src=${item.stu_profile_photo} alt=${item.stu_name} width='50'></td>
                    <td class='stu_id'>${item.stu_id}</td>
                    <td>${item.stu_name}</td>
                    <td>${item.stu_gender}</td>
                    <td>${item.stu_skill}</td>
                    <td>${item.stu_hobby}</td>
                    <td><input type="button" class="btn btn-primary edit" value='修改'/></td>
                    <td><input type="button" class="btn btn-danger delete" value='删除'/></td>
                </tr>            
            `
            }).join("");
            $("#list").html(html);

            //绑定点击事件

            $('.edit').each(function (idx) {
                $('.edit').eq(idx).on('click', function () {
                    let edit_id = $(this).parent().siblings().eq(1).html();
                    location.href = `../edit.html?stu_id=${edit_id}`;
                })
            })

            $('.delete').each(function (idx) {
                $('.delete').eq(idx).on('click', async function () {
                    let del_confirm = window.confirm('你确定要删除吗');
                    if(del_confirm){
                        let del_id = $(this).parent().siblings().eq(1).html()
                        // console.log('删除',del_id);
                        let del_data = await deleteuser(del_id);
                        // console.log(del_data);
                        
                        if(del_data == 'success'){
                            $(this).closest('tr').remove();
                            alert('删除成功')
                        }else{
                            return
                        }
                        
                    }
                })
            })
            


            //分页·
            // 总页数 = 
            //if(数据库总数%qty==0){
            //  总页数 = 数据库总数/qty
            //}else{
            //  总页数 = 数据库总数/qty+1
            // }
            //
            // qty = 10 每页数量
            //skip(X*10,X*10)  X == 当前页码
            //db.myCollection.find().sort({"ID":1}).skip(0).limit(10)命令，将其根据ID排序后，跳过10，查询10条，结果为10-19条的数据。
        };

        render();

        //搜索功能（stu_id）
        $('#serachBtn').on('click',async ()=>{
            render($('#serachText').val());
        })
    }else{
        location.href = '../login.html';
        return
    }
})