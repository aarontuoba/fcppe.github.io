// 初始化 EmailJS
(function() {
    emailjs.init("6bspcN_t1lxq_OI04");
})();

// 弹出对话框控制
const popupDialog = document.querySelector('.popup-dialog');
const minimizeBtn = document.querySelector('.minimize-btn');
const popupHeader = document.querySelector('.popup-header');
const messageForm = document.getElementById('messageForm');
const statusDiv = document.getElementById('form-status');

// 切换弹窗显示状态
function togglePopup() {
    popupDialog.classList.toggle('minimized');
    minimizeBtn.classList.toggle('minimized');
    
    if (popupDialog.classList.contains('minimized')) {
        minimizeBtn.textContent = '□';
    } else {
        minimizeBtn.textContent = '−';
    }
}

// 页面加载时显示弹窗
document.addEventListener('DOMContentLoaded', () => {
    popupDialog.style.display = 'block';
});

// 最小化按钮点击事件
minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup();
});

// 点击标题栏也可以切换状态
popupHeader.addEventListener('click', () => {
    togglePopup();
});

// 表单提交处理
messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // 显示加载状态
    const submitBtn = messageForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    statusDiv.textContent = '发送中...';
    
    try {
        const formData = new FormData(messageForm);
        const templateParams = {
            from_name: formData.get('name'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            to_email: 'shen.aaron@outlook.com'
        };
        
        console.log('准备发送邮件，参数：', templateParams);
        
        // 发送邮件
        const result = await emailjs.send(
            'service_8v19xia',  // 使用新的Gmail服务ID
            'template_u3s4h7w',
            templateParams
        );
        
        console.log('邮件发送结果：', result);
        
        // 清空表单
        messageForm.reset();
        
        // 显示成功提示
        statusDiv.textContent = '留言已成功发送！我们会尽快与您联系。';
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => { statusDiv.textContent = ''; }, 5000);
        
    } catch (error) {
        console.error('发送失败，详细错误：', error);
        console.error('错误代码：', error.code);
        console.error('错误信息：', error.text);
        statusDiv.textContent = '发送失败，请稍后重试。错误信息：' + (error.text || error);
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}); 