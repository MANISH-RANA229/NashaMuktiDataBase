function sendOTP() {
    const email = $('#email').val();
  
    $.ajax({
      url: '/api/v1/sendotp',
      type: 'POST',
      data: { email: email },
      success: function(response) {
        // Update the page based on the response
        if (response.success) {
          // Show a message that the OTP has been sent
          alert('OTP sent to email');
        } else {
          // Show an error message
          alert('Error sending OTP');
        }
      }
    });
  }
  