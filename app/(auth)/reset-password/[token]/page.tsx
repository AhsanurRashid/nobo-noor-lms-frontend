import ResetPasswordForm from "@/components/forms/resetPassword.form"

const ResetPasswordTokenPage = () => {
  return (
    <div className='flex justify-center'>
      <ResetPasswordForm /> {/* ✅ passing token to form */}
    </div>
  );
};

export default ResetPasswordTokenPage;