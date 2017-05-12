require_relative '../../lib/omniauth/facebook'

class AuthenticationController < ApplicationController
  def authenticate_user
    user_info = Omniauth::Facebook.authenticate(params[:fbToken])
    if user_info["email"].blank?
      Omniauth::Facebook.deauthorize(params[:fbToken])
    else
      user = User.find_for_database_authentication(email: user_info["email"])
      if user
        fb_provider = user.user_providers.where(:"provider_uid" => user_info["id"], :"provider" => "facebook")
        unless fb_provider
          user.user_providers.create!(provider: "facebook", provider_uid: user_info["id"])
        end
      else
        user = User.create!(email: user_info["email"], password: "password")
        if user && user.valid?
          user.user_providers.create!(provider: "facebook", provider_uid: user_info["id"])
        else
          render json: {errors: ['User cannot be created'], status: 500 }, status: :internal_server_error
        end
      end
      render json: payload(user, "facebook")
    end
  end

  def authenticate_user2
    user = User.find_for_database_authentication(email: params[:username])
    if user && user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password'], status: 401 }, status: :unauthorized
    end
  end

  def create_user
    user = User.create!(user_params)
    if user && user.valid?
      render json: payload(user)
    end
  end

  private

  def payload(user, user_provider)
    return nil unless user && user.id
    expiration = Time.now.to_i + (60 * 120)
    {
      token: JsonWebToken.encode({user_id: user.id}, expiration),
      user: {id: user.id, email: user.email},
      expiration: expiration,
      user_provider: user_provider
    }
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
