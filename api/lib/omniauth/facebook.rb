require 'httparty'
require_relative './response_error'

module Omniauth
  class Facebook
    include HTTParty

    base_uri "https://graph.facebook.com/v2.9"

    def self.authenticate(access_token)
      provider = self.new
      user_info = provider.get_user_profile(access_token)
      return user_info
    end

    def self.deauthorize(access_token)
      options  = { query: { access_token: access_token } }
      response = self.delete('/me/permissions', options)

      # Something went wrong most propably beacuse of the connection.
      unless response.success?
        Rails.logger.error 'Omniauth::Facebook.deauthorize Failed'
        fail Omniauth::ResponseError, 'errors.auth.facebook.deauthorization'
      end
      response.parsed_response
    end

    def get_user_profile(access_token)
      options = { query: { access_token: access_token } }
      response = self.class.get('/me?fields=id,name,first_name,middle_name,last_name,short_name,name_format,gender,email,picture{url,height,width}', options)

      # Something went wrong most propably beacuse of the connection.
      unless response.success?
        Rails.logger.error 'Omniauth::Facebook.get_user_profile Failed'
        fail Omniauth::ResponseError, 'errors.auth.facebook.user_profile'
      end
      response.parsed_response
    end

    # private

    # def query(code)
    #   {
    #     query: {
    #       code: code,
    #       redirect_uri: "http://localhost:4200/",
    #       client_id: Rails.application.secrets.facebook_app_id,
    #       client_secret: Rails.application.secrets.facebook_app_secret
    #     }
    #   }
    # end
  end
end
