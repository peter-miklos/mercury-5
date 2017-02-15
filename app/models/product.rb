class Product
  include Mongoid::Document
  include Mongoid::Timestamps
  field :category, type: String
  field :group, type: String
  field :name, type: String
  field :price, type: Float
  field :origin, type: String

  validates_presence_of :category, :group, :name, :price, :origin
  validates_inclusion_of :price, in: 0.01...10000
end
