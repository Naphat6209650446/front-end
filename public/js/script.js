function submitLogin() {
    console.log('submitLogin function started');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // เริ่มต้นการเชื่อมต่อกับ API
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUa9dcde19734981739fbc877c2c23aafa9178eb66b505093111b0980eaaf6bfe548624c65aac8fe29718172dcfce55f00'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('API Response:', data);  // ตรวจสอบการตอบกลับจาก API
        
        // ตรวจสอบสถานะการตอบกลับจาก API
        if (data.status === "success" && data.apiKey) {
            // ตรวจสอบ apiKey ที่ได้รับจาก API และเก็บข้อมูลใน sessionStorage
            sessionStorage.setItem('status', data.status);
            sessionStorage.setItem('tu_status', data.tu_status);
            sessionStorage.setItem('message', data.message);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('displayname_th', data.displayname_th);
            sessionStorage.setItem('displayname_en', data.displayname_en);
            sessionStorage.setItem('statusid', data.statusid);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('type', data.type);
            sessionStorage.setItem('department', data.department);
            sessionStorage.setItem('faculty', data.faculty);
            
            // เก็บ apiKey ลงใน sessionStorage
            sessionStorage.setItem('apiKey', data.apiKey);  // สมมติว่า apiKey เป็นส่วนหนึ่งของ response

            // ตรวจสอบว่า apiKey ถูกเก็บใน sessionStorage
            const storedApiKey = sessionStorage.getItem('apiKey');
            if (storedApiKey) {
                console.log('API Key:', storedApiKey);
                // ลิงก์ไปยังหน้า loginSucc.html
                window.location.href = 'loginSucc.html';
            } else {
                alert('Invalid API Key');
            }
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    });
}
