class UserProvider
  include Mongoid::Document
  include Mongoid::Timestamps
  field :provider,      type: String
  field :provider_uid,  type: String

  validates_presence_of :provider, :provider_uid

  embedded_in :user
end
