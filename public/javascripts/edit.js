jQuery(async ($) => {
    let stu_id = decodeURI(location.search.slice(8));
    // console.log(stu_id);
    if (stu_id.length <= 0) {
        alert('参数错误');
        location.href = '../dashboard.html'
        return
    } else {
        // //判断是否登录成功
        let autologin = (token) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "http://39.105.167.17:3000/setting/autologin",
                    headers: {
                        token: token
                    },
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }
        var checkStatus = await autologin(localStorage.getItem('token'));
        if (checkStatus) {

            //请求数据渲染页面
            let getUserList = (stu_id) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        data: {
                            stu_id: stu_id
                        },
                        url: "http://39.105.167.17:3000/setting/findUser",
                        success(data) {
                            resolve(data)
                        }
                    })
                })
            }
            //发送请求修改页面
            let editUser = (stu_id, stu_name, stu_gender, stu_skill, stu_hobby, stu_profile_photo) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        data: {
                            stu_id: stu_id,
                            stu_name: stu_name,
                            stu_gender: stu_gender,
                            stu_skill: stu_skill,
                            stu_hobby: stu_hobby,
                            stu_profile_photo: stu_profile_photo
                        },
                        url: "http://39.105.167.17:3000/setting/editUser",
                        success(data) {
                            resolve(data)
                        }
                    })
                })
            }
            let uploadImg = (fin) => {
                    return new Promise((resolve, reject) => {
                        var fileNode = $('#stu_profile_photo')[0];
                        //构造form数据 你可以用它传输文件流 它是基于form-data的传输方案
                        var data = new FormData();
                        // 单图上传，默认选第一张，如果是多图的话，就要for循环遍历fileNode.files数组，并全部append到data里面传输
                        data.append("profile_photo", fileNode.files[0]);
                        console.log(data);

                        $.ajax({
                            url: 'http://39.105.167.17:3000/setting/uploadImg',
                            type: 'post',
                            data: data,
                            contentType: false,
                            processData: false,
                            success: function (res) {
                                resolve(res)
                            }
                        })
                        //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
                        if (fin) {
                            fileNode.value = null;
                        } else {
                            return
                        }

                    })
                }
                (async () => {
                    let data = await getUserList(stu_id);
                    let img;
                    // console.log(data);
                    let html = data.map(function (item) {
                        // console.log(item.stu_id);
                        // console.log(item.stu_hobby);

                        return `<div class="form-row">
                <div class="form-group col-md-12">
                    <label for="inputCity">学号</label>
                    <input type="text" class="form-control" id="stu_id" value=${item.stu_id} readonly="readonly"/>
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">头像</label>
                <td><img src=${item.stu_profile_photo} alt=${item.stu_name} width='100' style='margin-bottom:15px;' id='pho'/></td>
                <input type="file" class="form-control" id="stu_profile_photo" name="profile_photo"/>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">姓名</label>
                    <input type="text" class="form-control" id="stu_name" value="${item.stu_name}" />
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword4">性别</label>
                    <input type="text" class="form-control" id="stu_gender" value="${item.stu_gender}" />
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">特长</label>
                <input type="text" class="form-control" id="stu_skill" value="${item.stu_skill}" />
            </div>
            <div class="form-group">
                <label for="inputAddress2">爱好</label>
                <input type="text" class="form-control" id="stu_hobby" value="${item.stu_hobby}" />
            </div>
            <input type="button" class="btn btn-primary" value="修改" id="edit"/>`
                    }).join('');
                    $('main').html(html)

                    $('#stu_profile_photo').on('change', async () => {
                        $('.cover').css('display','block')
                        var res = await uploadImg();
                        if(res.status == 'success'){
                            $('.cover').css('display','none')
                        }
                        var src = res.file.filename;
                        // console.log($('#stu_profile_photo').val());
                        $('#pho')[0].src = src;

                    })

                    //点击修改按钮时获取数据，并发送请求修改数据
                    $('#edit').on('click', async () => {
                        let stu_id = $('#stu_id').val();
                        let stu_name = $('#stu_name').val();
                        let stu_gender = $('#stu_gender').val();
                        let stu_skill = $('#stu_skill').val();
                        let stu_hobby = $('#stu_hobby').val();
                        let stu_profile_photo = $('#pho')[0].src;
                        console.log($('#pho')[0].src);



                        var e_data = await editUser(stu_id, stu_name, stu_gender, stu_skill, stu_hobby, stu_profile_photo);
                        if (e_data == 'success') {

                            // alert('修改成功');
                            location.href = '../dashboard.html';
                        } else {
                            return
                        }


                    })

                })();
        } else {
            location.href = '../login.html'
        }
    }
})