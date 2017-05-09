class ApiController < ApplicationController
  before_filter :authenticate_request!
  before_filter :find_product, only: [:show, :update, :destroy]

  def index
    @products = Product.all
    render json: @products
  end

  def show
    render json: @product
  end

  def create
    @product = Product.create!(product_params)
    render json: @product
  end

  def update
    @product.update_attributes!(product_params)
    render json: @product
  end

  def destroy
    if @product.delete
      render json: {"status": "Product has been removed."}
    else
      render json: { error: 'Bad Request', status: 400 }, status: :bad_request
    end
  end

  private
  def product_params
    params.require(:api).permit(:category, :group, :name, :price, :origin)
  end

  def find_product
    @product = Product.find(params[:product_id])
  end

end
