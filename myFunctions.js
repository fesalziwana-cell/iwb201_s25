

$(document).ready(function() {
    
  
    $(document).on('change', '.show-details', function() {
        var row = $(this).closest('tr');
        var detailsRow = row.next('.details-row');
        if (this.checked) {
            detailsRow.show();
        } else {
            detailsRow.hide();
        }
    });

  
    $(document).on('click', '#continueBtn', function() {
        var isChecked = $('.select-meal:checked').length;
        if (isChecked > 0) {
            $('#orderSection').slideDown();
        } else {
            alert("يرجى اختيار وجبة واحدة على الأقل أولاً.");
        }
    });

});


function validateAndSubmit() {
   
    var custName = $('#custName').val();
    var bankAcc = $('#bankAcc').val();
    var orderDate = $('#orderDate').val();
    var phone = $('#phone').val();

 
    var nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    var accRegex = /^\d{6}$/;
    var dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    var phoneRegex = /^(09)\d{8}$/;

   
    if (!nameRegex.test(custName)) {
        alert("خطأ: الاسم يجب أن يكون مقطعين باللغة الإنكليزية.");
        return;
    }
    if (!accRegex.test(bankAcc)) {
        alert("خطأ: رقم الحساب يجب أن يتكون من 6 أرقام.");
        return;
    }
    if (!dateRegex.test(orderDate)) {
        alert("خطأ: التاريخ يجب أن يكون بتنسيق dd-mm-yyyy.");
        return;
    }
    if (!phoneRegex.test(phone)) {
        alert("خطأ: رقم الموبايل غير صحيح.");
        return;
    }

   
    var total = 0;
    var itemsList = "";
    $('.select-meal:checked').each(function() {
        var row = $(this).closest('tr');
        var mName = row.find('td:nth-child(2)').text();
        var mPrice = parseInt($(this).val());
        total += mPrice;
        itemsList += "<li>" + mName + " - " + mPrice + " ل.س</li>";
    });

    var tax = total * 0.10;
    var discount = (total > 100000) ? (total * 0.05) : 0;
    var finalAmount = total + tax - discount;

   
    var resultHTML = 
        '<div dir="rtl" style="font-family:Arial; padding:40px; border:8px double #15088b; background:#fff; max-width:600px; margin:auto; text-align:right;">' +
            '<h1 style="text-align:center;">فاتورة مطعم القصر</h1>' +
            '<hr>' +
            '<p><b>الزبون:</b> ' + custName + '</p>' +
            '<p><b>التاريخ:</b> ' + orderDate + '</p>' +
            '<h3>الوجبات المطلوبة:</h3>' +
            '<ul>' + itemsList + '</ul>' +
            '<hr>' +
            '<p>المجموع الأساسي: ' + total + ' ل.س</p>' +
            '<p>الضريبة (10%): ' + tax + ' ل.س</p>' +
            '<p>الحسم المستحق: ' + discount + ' ل.س</p>' +
            '<h2 style="color:red; text-align:center;">الإجمالي النهائي: ' + finalAmount + ' ل.س</h2>' +
            '<div style="text-align:center;">' +
                
                '<button onclick="location.reload()" style="padding:10px 20px; background:#34495e; color:white; border:none; cursor:pointer; margin:5px;">طلب جديد</button>' +
            '</div>' +
        '</div>';

    $('body').html(resultHTML);
}