class AuthenticationController < ApplicationController
  def authenticate_user
    user = User.find_for_database_authentication(email: params[:email])
    if user && user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
    end
  end

  def create_user
    user = User.create!(user_params)
    if user && user.valid?
      render json: payload(user)
    end
  end

  private

  def payload(user)
    return nil unless user && user.id
    expiration = Time.now.to_i + (60 * 120)
    {
      token: JsonWebToken.encode({user_id: user.id}, expiration),
      user: {id: user.id, email: user.email}
    }
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
