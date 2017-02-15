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
    @product = Product.create!(product_params)
    render json: @product
  end

  def update
    @product = Product.find(params[:product_id])
    @product.update_attributes!(product_params)
    render json: @product
  end

  def destroy
    @product = Product.find(params[:product_id])
    if @product.delete
      render json: {"status": "Product has been removed."}
    else
      render head: {}, status: :bad_request
    end
  end

  private
  def product_params
    params.require(:api).permit(:category, :group, :name, :price, :origin)
  end

end
