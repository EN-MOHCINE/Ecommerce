<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class emailCheckout extends Mailable
{
    use Queueable, SerializesModels;
    public $datalist;
    /**
     * Create a new message instance.
     * 
     * @return void
     */
    public function __construct(Array $datalist)
    {
        //
        $this->datalist=$datalist;
    }

   /**
    * Build the message
    *
    * @return $this
    */
    public function build()
    {
        return $this->subject('checkOut Message')->view('emails.Checkout');
    }
}
