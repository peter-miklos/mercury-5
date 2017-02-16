class JsonWebToken
  def self.encode(payload, expiration)
    payload[:exp] = expiration
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    return HashWithIndifferentAccess.new(JWT.decode(token, Rails.application.secrets.secret_key_base)[0])
  rescue
    nil
  end
end
