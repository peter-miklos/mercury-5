class ApiController < ApplicationController

  def index
    @products = Product.all
    render json: @products
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

end
