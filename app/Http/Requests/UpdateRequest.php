<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array

    {
        return [
            'name' => 'required',
            'price' => 'required',
            'quantity' => 'required|integer',
            'description' => 'required',
            'category_id' => 'required',
            'size_id' => 'required',
            'collection_id' => 'required',
            'tags.tag.*' => 'nullable|string'
        ];
    }
}
