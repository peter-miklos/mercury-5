class Product
  include Mongoid::Document
  field :category, type: String
  field :group, type: String
  field :name, type: String
  field :price, type: Float
  field :origin, type: String
end
