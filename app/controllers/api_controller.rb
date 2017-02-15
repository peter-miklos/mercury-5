class ApiController < ApplicationController

  def index
    @products = Product.all
    render json: @products
  end

  def show
    @product = Product.find(params[:product_id])
    render json: @product
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product
    else
      render head: {}, status: :bad_request
    end
  end

  def update
  end

  def destroy
  end

  private
  def product_params
    params.require(:api).permit(:category, :group, :name, :price, :origin)
  end

end
