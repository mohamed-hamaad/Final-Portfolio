module.exports = {
    darkMode: 'class', 
    content: [
        // هيجيب أي ملف html في أي مكان في المشروع
        "./**/templates/**/*.html", 
        // هيجيب ملفات الـ HTML اللي في الـ root لو موجودة
        "./templates/**/*.html",     
        // هيجيب أي ملف JS جوه فولدر static
        "./**/static/**/*.js",       
        // للاحتياط لو مستخدم كلاسات في ملفات python زي الـ forms
        "./**/forms.py",             
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}