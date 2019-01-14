jQuery(async ($) => {
    // //判断是否登录成功
    let autologin = (token) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:3000/setting/autologin",
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

        let uploadImg = (fin) => {
            return new Promise((resolve, reject) => {
                var fileNode = $('#stu_profile_photo')[0];
                //构造form数据 你可以用它传输文件流 它是基于form-data的传输方案
                var data = new FormData();
                // 单图上传，默认选第一张，如果是多图的话，就要for循环遍历fileNode.files数组，并全部append到data里面传输
                data.append("profile_photo", fileNode.files[0]);
                console.log(data);

                $.ajax({
                    url: 'http://127.0.0.1:3000/setting/uploadImg',
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

        $('#stu_profile_photo').on('change', async () => {
            var res = await uploadImg();
            var src = res.file.filename;
            console.log(res);
            // console.log($('#stu_profile_photo').val());
            $('#pho')[0].src = src;


        })


        $('#insert').on('click', async () => {
            let stu_id = $('#stu_id').val();
            let stu_name = $('#stu_name').val();
            let stu_gender = $('#stu_gender').val();
            let stu_skill = $('#stu_skill').val();
            let stu_hobby = $('#stu_hobby').val();
            let stu_profile_photo = $('#pho')[0].src;
                // console.log($('#pho')[0].src);

            var r_data = await insertUser(stu_id, stu_name, stu_gender, stu_skill, stu_hobby, stu_profile_photo);
            if (r_data == 'success') {
                // alert('插入成功');
                location.href = '../dashboard.html';
            } else {
                alert(r_data);
                $('#stu_id').val('');
            }

        })

        let insertUser = (stu_id, stu_name, stu_gender, stu_skill, stu_hobby, stu_profile_photo) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:3000/setting/insertUser",
                    data: {
                        stu_id: stu_id,
                        stu_name: stu_name,
                        stu_gender: stu_gender,
                        stu_skill: stu_skill,
                        stu_hobby: stu_hobby,
                        stu_profile_photo: stu_profile_photo
                    },
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }
    } else {
        location.href = '../login.html';
        return
    }
})