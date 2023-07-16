package junit;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.platform.commons.util.StringUtils;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ParameterizedTestTest
{

    // #region simple
    @ParameterizedTest
    @ValueSource(strings = {"duoli", "mark", "0428"})
    public void palindrome(String candidate)
    {
        assertTrue(StringUtils.isNotBlank(candidate));
    }
    // #endregion simple
}
