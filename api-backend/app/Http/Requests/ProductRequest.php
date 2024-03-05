<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id');
        return [
            'id_category'=>'required',
            'name'=>'required',
            'pic'=>'required',
            'sku' => 'unique:products,sku,' . $id,
            'minimum_quantity'=>'required',
            'quantity'=>'required',
            'moyen_purchase_price'=>'required',
            'selling_price'=>'required',
        ];
    }
}
