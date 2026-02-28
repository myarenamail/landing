
// ----------- DOM READY FOR OLD & NEW BROWSERS -----------
(function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') fn();
        });
    }
})(function() {

    // ----------- ELEMENTS -----------
    var form = document.getElementById("sendUsMessage");
    var button = document.getElementById("sendUsMessageBtn");
    if (!form || !button) return;

    var originalText = button.innerHTML;

    // ----------- HELPER FUNCTIONS FOR OLD BROWSERS -----------
    function addClass(el, cls) {
        if (el.classList) el.classList.add(cls);
        else el.className += " " + cls;
    }
    function removeClass(el, cls) {
        if (el.classList) el.classList.remove(cls);
        else el.className = el.className.replace(new RegExp("\\b" + cls + "\\b", "g"), "");
    }

    // ----------- SHOW SUCCESS ---------
    function handleSuccess(msg) {
        // Keep loading for 5 seconds
        setTimeout(function() {
            button.innerHTML = "✔ " + msg;
            removeClass(button, "btn-loading");
            addClass(button, "btn-success");

            // Keep success visible for 20 seconds
            setTimeout(function() {
                button.disabled = false;
                removeClass(button, "btn-success");
                button.innerHTML = originalText;
            }, 20000);

        }, 3000);
    }

    // ----------- SHOW ERROR ---------
    function showError(msg) {
        button.innerHTML = "✖ " + msg;
        removeClass(button, "btn-loading");
        addClass(button, "btn-danger");

        setTimeout(function() {
            button.disabled = false;
            removeClass(button, "btn-danger");
            button.innerHTML = originalText;
        }, 10000);
    }

    // ----------- FORM SUBMIT HANDLER -----------
    if (form.addEventListener) {
        form.addEventListener("submit", submitHandler);
    } else {
        form.attachEvent("onsubmit", submitHandler); // old IE
    }

    function submitHandler(e) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false; // old IE

        // Basic HTML5 validation
        if (form.checkValidity && !form.checkValidity()) {
            if (form.reportValidity) form.reportValidity();
            return;
        }

        // Disable button + show loading spinner
        button.disabled = true;
        addClass(button, "btn-loading");
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> جاري الإرسال...';

        // ----------- AJAX SETUP -----------
        var xhr;
        if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        else xhr = new ActiveXObject("Microsoft.XMLHTTP"); // old IE

        xhr.open("POST", "saveMessage.cfm", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var response;
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (err) {
                    showError("خطأ غير متوقع");
                    return;
                }

                if (xhr.status === 200 && response.success) {
                    form.reset();
                    handleSuccess(response.message);
                } else {
                    showError(response.message || "حدث خطأ أثناء الإرسال");
                }
            }
        };

        xhr.onerror = function() {
            showError("Network error");
        };

        // ----------- SEND FORM DATA -----------
        var formData =
            "msgfrom_name=" + encodeURIComponent(form.msgfrom_name.value) +
            "&msgfrom_ph=" + encodeURIComponent(form.msgfrom_ph.value) +
            "&msgfrom_email=" + encodeURIComponent(form.msgfrom_email.value) +
            "&msgfrom_message=" + encodeURIComponent(form.msgfrom_message.value) +
            "&msgto_department=" + encodeURIComponent(form.msgto_department.value);

        xhr.send(formData);
    }

});



































(function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') fn();
        });
    }
})(function() {

    var form = document.getElementById("newslettersubs");
    var button = document.getElementById("newsletterBtn");
    var emailInput = document.getElementById("newsletter_email");

    if (!form || !button || !emailInput) return;

    var originalText = button.innerHTML;

    // ---------- Helper Functions ----------
    function addClass(el, cls) {
        if (el.classList) el.classList.add(cls);
        else el.className += " " + cls;
    }

    function removeClass(el, cls) {
        if (el.classList) el.classList.remove(cls);
        else el.className = el.className.replace(new RegExp("\\b" + cls + "\\b", "g"), "");
    }

    function showError(msg) {
        button.innerHTML = "✖ " + msg;
        removeClass(button, "btn-loading");
        addClass(button, "btn-danger");

        setTimeout(function() {
            button.disabled = false;
            removeClass(button, "btn-danger");
            button.innerHTML = originalText;
        }, 10000);
    }

    function showSuccess(msg) {

        // انتظار 3 ثواني مع رسالة التحميل
        setTimeout(function() {

            button.innerHTML = "✔ " + msg;
            removeClass(button, "btn-loading");
            addClass(button, "btn-success");

            // عرض النجاح 20 ثانية
            setTimeout(function() {
                button.disabled = false;
                removeClass(button, "btn-success");
                button.innerHTML = originalText;
            }, 20000);

        }, 3000);
    }

    // ---------- Form Submit ----------
    form.onsubmit = function(e) {

        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        if (!emailInput.value) {
            showError("يرجى إدخال البريد الإلكتروني");
            return;
        }

        button.disabled = true;
        addClass(button, "btn-loading");
        button.innerHTML = "جاري الاشتراك...";

        var xhr;
        if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        else xhr = new ActiveXObject("Microsoft.XMLHTTP");

        xhr.open("POST", "saveNewsletter.cfm", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4) {

                var response;

                try {
                    response = JSON.parse(xhr.responseText);
                } catch (err) {
                    showError("خطأ غير متوقع");
                    return;
                }

                // 🔥 FIX: دعم SUCCESS أو success
                var success = (typeof response.SUCCESS !== "undefined") 
                                ? response.SUCCESS 
                                : response.success;

                var message = (typeof response.MESSAGE !== "undefined") 
                                ? response.MESSAGE 
                                : response.message;

                if (xhr.status === 200 && success === true) {
                    form.reset();
                    showSuccess(message);
                } else {
                    showError(message || "حدث خطأ");
                }
            }
        };

        xhr.onerror = function() {
            showError("Network error");
        };

        xhr.send("email_address=" + encodeURIComponent(emailInput.value));
    };

});
