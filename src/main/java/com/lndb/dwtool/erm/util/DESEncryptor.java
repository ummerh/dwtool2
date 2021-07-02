package com.lndb.dwtool.erm.util;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

public class DESEncryptor {

	private static final String PROVIDER = "DES";
	private static final String ALG_DES_ECB_PKCS5_PADDING = "DES/ECB/PKCS5Padding";
	private static final String KEY_PASSWORD = "thiruneyvedyam";
	private static Cipher encryptor;
	private static Cipher decryptor;
	static {
		try {
			SecretKey desKey = unwrapEncodedKey(KEY_PASSWORD);
			encryptor = Cipher.getInstance(ALG_DES_ECB_PKCS5_PADDING);
			encryptor.init(Cipher.ENCRYPT_MODE, desKey);
			decryptor = Cipher.getInstance(ALG_DES_ECB_PKCS5_PADDING);
			decryptor.init(Cipher.DECRYPT_MODE, desKey, encryptor.getParameters());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private static SecretKey unwrapEncodedKey(String key) throws Exception {
		KeyGenerator keygen = KeyGenerator.getInstance(PROVIDER);
		SecretKey desKey = keygen.generateKey();
		Cipher cipher = Cipher.getInstance(ALG_DES_ECB_PKCS5_PADDING);
		cipher.init((Cipher.UNWRAP_MODE), desKey);

		byte[] bytes = Base64.getDecoder().decode(key);
		SecretKeyFactory desFactory = SecretKeyFactory.getInstance(PROVIDER);
		DESKeySpec keyspec = new DESKeySpec(bytes);
		SecretKey k = desFactory.generateSecret(keyspec);
		return k;
	}

	public static String encrypt(String data) {
		byte[] encrypted = null;
		try {
			if (data != null) {
				byte[] encData = encryptor.doFinal(data.getBytes());
				encrypted = Base64.getEncoder().encode(encData);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return new String(encrypted);
	}

	public static String decrypt(String data) {
		String decrypted = null;
		try {
			if (data != null) {
				byte[] encData = Base64.getDecoder().decode(data);
				decrypted = new String(decryptor.doFinal(encData));
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return decrypted;
	}
}
