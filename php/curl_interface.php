<?php
class curl_interface {
	private $securityHeader = [ ];
	public $defaultURL = '';
	function __construct($securityHeader = [], $defaultURL = '') {
		if (func_num_args () >= 1 and ! empty ( $securityHeader )) {
			$this->securityHeader = $securityHeader;
		}
		if (func_num_args () >= 2 and ! empty ( $defaultURL )) {
			$this->defaultURL = $defaultURL;
		}
	}

	/**
	 * Authorise a cURL request using $securityHeader property
	 *
	 * @param resource $ch
	 *        	cURL session to authorise
	 */
	public function auth($ch) {
		if (! empty ( $this->securityHeader )) {
			curl_setopt ( $ch, CURLOPT_HTTPHEADER, $this->securityHeader );
		}
	}

	/**
	 * Set the OAUTH2 security header that will be used to authorise transactions.
	 *
	 * @param string $securityHeader
	 *        	Security header in array format
	 */
	public function set_security_header($securityHeader) {
		$this->securityHeader = $securityHeader;
	}

	/**
	 * Send a POST requst using cURL
	 *
	 * @param string $url
	 *        	to request
	 * @param array $post
	 *        	values to send
	 * @param array $options
	 *        	for cURL
	 * @return string
	 */
	public function curl_post($url, array $post = NULL, array $options = array()) {
		set_time_limit ( 30 );
		$defaults = array (
				CURLOPT_POST => 1,
				CURLOPT_HEADER => 0,
				CURLOPT_URL => $url,
				CURLOPT_FRESH_CONNECT => 1,
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_FORBID_REUSE => 1,
				CURLOPT_TIMEOUT => 4,
				CURLOPT_POSTFIELDS => json_encode ( $post )
		);

		$ch = curl_init ();
		$this->auth ( $ch );

		curl_setopt_array ( $ch, ($options + $defaults) );

		if (! $result = curl_exec ( $ch )) {
			// trigger_error(curl_error($ch));
		}
		curl_close ( $ch );
		return json_decode ( $result, true );
	}

	/**
	 * Send a GET requst using cURL
	 *
	 * @param string $url
	 *        	to request
	 * @param array $get
	 *        	values to send
	 * @param array $options
	 *        	for cURL
	 * @return string
	 */
	public function curl_get($url, array $get = null, array $options = array(), $useAuth=1) {
		set_time_limit ( 30 );
		$defaults = array (
				CURLOPT_HEADER => 0,
				CURLOPT_RETURNTRANSFER => TRUE,
				CURLOPT_TIMEOUT => 4
		);


		if (! is_null ( $get )) {
			$defaults [CURLOPT_URL] = $url . (strpos ( $url, '?' ) === FALSE ? '?' : '') . http_build_query ( $get );
		} else {
			$defaults [CURLOPT_URL] = $url;
		}
		
		$ch = curl_init ();
		if ($useAuth)	{
				$this->auth ( $ch );
		}

		curl_setopt_array ( $ch, ($options + $defaults) );

			if (! $result = curl_exec ( $ch )) {
				trigger_error(curl_error($ch));
			}

		curl_close ( $ch );

		return $result;
		// return json_decode ( $result, true );
	}

	/**
	 * Do a PUT request using cURL
	 *
	 * @param string $url
	 *        	API URL to request
	 * @param string $delete
	 *        	JSON arguments
	 * @param array $options
	 *        	for cURL
	 * @param boolean $rawInput
	 *        	true if no encoding should be done on input
	 * @return string $result JSON encoded response.
	 */
	public function curl_put($url, $put = '', array $options = array(), $rawInput = false) {
		set_time_limit ( 120 );
		if (! $rawInput) {
			$put = json_encode ( $put );
			echo 'json';
		}

		$defaults = array (
				CURLOPT_URL => $url,
				CURLOPT_POSTFIELDS => $put,
				CURLOPT_CUSTOMREQUEST => "PUT",
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_TIMEOUT_MS => 60000
		);

		$ch = curl_init ();
		$this->auth ( $ch );

		curl_setopt_array ( $ch, ($options + $defaults) );

		if (! $result = curl_exec ( $ch )) {
			// trigger_error(curl_error($ch));
		}
		curl_close ( $ch );
		return json_decode ( $result, true );
	}

	/**
	 * Do a DELETE request using cURL
	 *
	 * @param string $url
	 *        	API URL to delete
	 * @param string $delete
	 *        	JSON arguments
	 * @param array $options
	 *        	for cURL
	 * @return string $result JSON encoded response.
	 */
	public function curl_delete($url, $delete = '', array $options = array()) {
		set_time_limit ( 30 );
		$defaults = array (
				CURLOPT_URL => $url,
				CURLOPT_POSTFIELDS => $delete,
				CURLOPT_CUSTOMREQUEST => "DELETE",
				CURLOPT_RETURNTRANSFER => 1
		);

		$ch = curl_init ();
		$this->auth ( $ch );

		curl_setopt_array ( $ch, ($options + $defaults) );

		if (! $result = curl_exec ( $ch )) {
			// trigger_error(curl_error($ch));
		}

		curl_close ( $ch );
		return json_decode ( $result, true );
	}
	public function isJson($string) {
		json_decode ( $string );
		return (json_last_error () == JSON_ERROR_NONE);
	}
}
?>
